import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as jestFetchMock from 'jest-fetch-mock'

jestFetchMock.enableFetchMocks()

Vue.config.productionTip = false

Vue.use(BootstrapVue)
