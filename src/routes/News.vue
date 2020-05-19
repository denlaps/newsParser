<template>
  <div>
    <h5>Выберите новости</h5>
    <div class="row">
      <div class="col s12">
        <select
          class="icons" 
          multiple
        >
          <option 
            :value="-1"
            disabled 
            selected
          >
            Список новостей со всех участвующих регионов
          </option>
          <option 
            v-for="(item, index) in comparedNews"
            :key="index"
            :value="index" 
            :data-icon="getUrl(item.news[0].domain, item.news[0].src)"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
    </div>
    <div class="col s12 center">
      <router-link
        tag="button"
        to="/results"
        class="btn-large waves-effect waves-light"
      >
        Подготовить рассылку
        <i class="material-icons right">send</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import data from '../dataRoot'

export default {
  name: 'News',
  data() {
    return data
  },

  watch: {
    comparedNews() {
      if(this.comparedNews.length > 0) {
        this.$nextTick(() => {
          this.updateSelect()
        })
      }
    }
  },
  
  mounted() {
    this.loadEffect(true)
    this.updateSelect()

    this.getData(() => {
      this.regionsChanged = false
      this.loadEffect(false)
    })
  },

  beforeRouteLeave(to, from, next) {
    if(to.path === '/') {
      next()
    } else if (to.path === '/results' && this.comparedNews.length > 0) {
      next(this.fillRegionNews())
    }
  },

  methods: {
    updateSelect() {
      const elem = document.querySelector('select')      
      const instance = M.FormSelect.getInstance(elem)

      if(instance !== undefined) {
        instance.destroy()
        console.log('updated')
      }

      M.FormSelect.init(elem)
    },

    loadEffect(turnOn) {
      const loadBlock = document.querySelector('main')

      if(turnOn) {
        loadBlock.classList.add('loading')
      } else {
        loadBlock.classList.remove('loading')
      }
    },

    getData(cb) {
      // If news already loaded => stop gettting data
      if(!this.regionsChanged) return false;

      // Clear old values
      this.comparedNews = []
      this.news = []

      // Array for promises
      const newsIsReady = []

      // Get all news from active regions
      this.activeRegions.map(region => {
        const domain = region.id
        const url = this.proxy + this.getUrl(domain, '/news/')
        const newPromise = fetch(url)
          .then((res) => res.text())
          .then((res) => {
            return this.parseNews(res, domain)
          })
          .catch((err) => {
            console.error(`[letterGen]: Can't connect to region "${domain}"`)
            console.error(err)
            M.toast({html: `Ошибка! Не получены данные из города ${region.name}, попробуйте еще раз выбрать регионы.`})
          })

        newsIsReady.push(newPromise)
      })

      Promise.all(newsIsReady)
        .then(this.sortNews)
        .then(this.compareNews)
        .then(cb)
    },

    getUrl(domain, path) {
      return `https://${domain}.${this.site}` + path
    },

    parseNews(bodyHTML, domain) {
      const data = bodyHTML.match(/href=".+class="news_card-link">\s+.+>/g)

      data.forEach((item) => {
        // Parse news
        const url = item.replace(/.*href="/, '').replace(/"\s(class="news_card-link").+\s+.+/, '')
        
        // Check if it not valid news or action
        const isNews = url.indexOf('?news') !== -1
        const isAction = url.indexOf('?viewaction') !== -1
        
        // Push valid news and actions to array
        if(isNews || isAction) {
          const id = url.match(/[0-9]+/)[0]
          const title = item.replace(/.+\s+.+alt="/, '').replace(/" border.+/, '')
          const src = item.replace(/.+\s+.+src="/, '').replace(/"\s(alt.+>)/, '')

          this.news.push({ id, title, domain, url, src })
        }
      })
    },

    sortNews() {
      // Sort news by asc id to find identical news in all regions
      this.news.sort((itemA, itemB) => {
        return itemA.id - itemB.id
      })
    },

    compareNews() {
      let prevItem = { title: '' }
      this.news.forEach(item => {
        if(item.title !== prevItem.title) {
          // Create new item in comparedNews
          this.comparedNews.push({
            title: item.title,
            active: false,
            news: [item]
          })
        } else {
          // If this is same news then push id to array of the last element in comparedNews
          const lastItem = this.comparedNews.length - 1
          this.comparedNews[lastItem].news.push(item)
        }

        prevItem = item
      })
    },

    fillRegionNews() {
      const elem = document.querySelector('select')
      const instance = M.FormSelect.getInstance(elem)

      this.regionNews = []
      
      // Get selected news stacks and conv news id to integer
      const selectedNews = instance.getSelectedValues().map((val) => parseInt(val, 10))
      const selected = selectedNews[0] !== -1

      if(selected) {
        this.activeRegions.forEach(region => {
          const newsInRegion = selectedNews.map(i => this.comparedNews[i].news
            .find(item => item.domain === region.id))
            .filter(obj => obj !== undefined)

          // Push compared news in each active region
          this.regionNews.push({
            domain: region.id,
            name: region.name,
            news: newsInRegion,
            edited: false
          })
        })

        return true

      } else {
        M.toast({ html: 'Вы не выбрали новость или акцию!' })
        
        return false
      }
    }
  }
}
</script>