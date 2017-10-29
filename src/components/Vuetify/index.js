import load from '../../util/load'
import application from './mixins/application'
import theme from './mixins/theme'

const Vuetify = {
  install (Vue, opts = {}) {
    if (this.installed) return

    this.installed = true

    const $vuetify = {
      load,
      application,
      breakpoint: {},
      theme: theme(opts.theme),
      touchSupport: false
    }

    Vue.util.defineReactive({}, 'breakpoint', $vuetify)
    Vue.util.defineReactive({}, 'application', $vuetify)

    Vue.prototype.$vuetify = $vuetify

    if (opts.transitions) {
      Object.keys(opts.transitions).forEach(key => {
        const t = opts.transitions[key]
        if (t.name !== undefined && t.name.startsWith('v-')) {
          Vue.component(t.name, t)
        }
      })
    }

    if (opts.directives) {
      Object.keys(opts.directives).forEach(key => {
        const d = opts.directives[key]
        Vue.directive(d.name, d)
      })
    }

    if (opts.components) {
      Object.keys(opts.components).forEach(key => {
        const c = opts.components[key]
        Vue.use(c)
      })
    }
  }
}

export default Vuetify
