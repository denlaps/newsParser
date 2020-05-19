<template>
  <div>
    <h5>Результат</h5>
    <div class="row">
      <ul class="collapsible">
        <li
          v-for="(region, r_key) in regionNews"
          :key="r_key"
        >
          <div class="collapsible-header">
            <i class="material-icons">edit</i>
            {{ region.name }}
            <span 
              v-show="regionNews[r_key].edited"
              data-badge-caption="изменен" 
              class="new badge"
            />
          </div>
          <div class="collapsible-body">
            <ul class="collection">
              <li
                v-for="(item, n_key) in regionNews[r_key].news"
                :key="n_key"
                class="collection-item"
              >
                <div class="row">
                  <div class="col s3">
                    <img 
                      :src="getUrl(region.domain, item.src)"
                    >
                  </div>
                  <div class="col s8">
                    <h6 class="title">{{ item.title }}</h6>
                    <a 
                      :href="getUrl(item.domain, item.url)"
                      target="_blank"
                    >
                      {{ getUrl(region.domain, item.url) }}
                    </a>
                  </div>
                  <div class="col s1">
                    <a 
                      href="#" 
                      class="secondary-content"
                      @click.prevent="removeItem(r_key, n_key)"
                    >
                      <i class="material-icons">close</i>
                    </a>
                  </div>
                </div>
              </li>
            </ul>

            <div 
              v-if="isEmpty(r_key)"
              style="margin: 20px;"
            >
              Для данного региона не было найдено выбранных новостей или акций.
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="col s12 center">
      <button
        class="btn-large waves-effect waves-light"
        @click="saveJSON()"
      >
        Скачать готовый файл
        <i class="material-icons right">save</i>
      </button>
    </div>
  </div>
</template>

<script>
import data from '../dataRoot';

export default {
  name: 'Results',
  data() {
    return data
  },

  mounted() {
    const elems = document.querySelectorAll('.collapsible')
    const instances = M.Collapsible.init(elems, { accordion: true })
  },

  methods: {
    getUrl(domain, path) {
      return `https://${domain}.${this.site}` + path
    },

    removeItem(r_key, n_key) {
      this.regionNews[r_key].news.splice(n_key, 1)
      this.regionNews[r_key].edited = true
    },

    isEmpty(r_key) {
      return this.regionNews[r_key].news.length === 0
    },

    saveJSON() {
      const a = document.createElement('a')
      // console.log(JSON.parse(this.regionNews))
      a.href = 'data:application/json;charset=utf-8,' + JSON.stringify(this.regionNews.map((el, i) => {
        el.news = el.news.map((item, index) => {
          const title = item.title
          item.title = title.replace(/\s/g, '/s')
          return item
        })
        
        return el
      }), null, '\t')
      a.download = 'mail_actions.json'
      // console.log(a)
      a.click()
    }
  }
}
</script>

<style>
  .collapsible-body .row {
    margin-bottom: 0;
  }

  .collection-item img {
    max-width: 100%;
  }

  .collapsible-body {
    padding: 0;
  }

  .collection-item {
    padding: 20px 0;
  }
</style>