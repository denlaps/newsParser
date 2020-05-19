<template>
  <div>
    <h5>Выберите города, участвующие в рассылке:</h5>
    <div class="col s12 switch">
      <label>
        <input
          v-model="allChecked"
          type="checkbox"
        >
        <span class="lever" />
        Выбрать все
      </label>
    </div>
    <div class="row">
      <p
        v-for="(region, index) in regions"
        :key="index"
        class="col s4 m3"
      >
        <label>
          <input 
            v-model="region.active"
            type="checkbox"
            @click="changeRegions"
          >
          <span>{{ region.name }}</span>
        </label>
      </p>
    </div>
    <div class="col s12 center">
      <router-link 
        tag="button"
        to="/news"
        class="btn-large waves-effect waves-light"
      >
        Далее
        <i class="material-icons right">send</i>
      </router-link>
    </div>
  </div>
</template>

<script>
import data from '../dataRoot'

export default {
  name: 'Regions',
  data() {
    return data
  },

  computed: {
    allChecked: {
      get() {
        let status = true

        for(let region of this.regions) {
          if(!region.active) {
            status = false
            break;
          }
        }

        return status
      },

      set() {
        const currStatus = this.allChecked
        this.regions.forEach((region, index) => {
          this.regions[index].active = !currStatus
        })

        this.regionsChanged = true
      }
    }
  },

  beforeRouteLeave(to, from, next) {
    // Fill activeRegions
    this.activeRegions = this.regions.filter(region => region.active)
    // If activeRegions is empty => stop route
    if(this.activeRegions.length > 0) {
      next()
    } else {
      next(false)
      M.toast({html: 'Должен быть выбран как минимум один регион!'})
    }
  },

  methods: {
    changeRegions() {
      this.regionsChanged = true
    }
  }
}
</script>

<style>
  .switch {
    margin: 20px 0;
  }
</style>