<template>
  <q-data-table :data="table" :config="config" :columns="columns" @refresh="refresh" 
      @selection="selection"
@rowclick="rowClick">
    <!-- Custom renderer for "message" column -->
    <template slot="col-message" slot-scope="cell">
      <span class="light-paragraph">{{cell.data}}</span>
    </template>
    <!-- Custom renderer for "source" column -->
    <template slot="col-source" slot-scope="cell">
      <span v-if="cell.data === 'Audit'" class="label text-white bg-primary">
        Audit
        <q-tooltip>Some data</q-tooltip>
      </span>
      <span v-else class="label text-white bg-negative">{{cell.data}}</span>
    </template>
    <!-- Custom renderer for "action" column with button for custom action -->
    <template slot='col-action' slot-scope='cell'>
      <q-btn color="primary" @click='doSomethingMethod(cell.row.id)'>View</q-btn>
    </template>
    <!-- Custom renderer when user selected one or more rows -->
    <template slot="selection" slot-scope="selection">
      <q-btn color="primary" @click="changeMessage(selection)">
        <i>edit</i>
      </q-btn>
      <q-btn color="primary" @click="deleteRow(selection)">
        <i>delete</i>
      </q-btn>
    </template>
  </q-data-table>
</template>

<script>

import { QDataTable, QField, QInput, QCheckbox, QSearch, QSelect, QSlider, QBtn, QIcon, QTooltip, QCollapsible, clone } from 'quasar'
import table from 'data/table.json'

var TableFilter = {render: function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c('div',
    {staticClass: 'q-data-table-toolbar upper-toolbar row col items-center'},
    [
      _c('q-search',
        {staticClass: 'col',
          attrs: {'placeholder': _vm.labels.search},
          model: {
            value: (_vm.filtering.terms),
            callback: function ($$v) { _vm.$set(_vm.filtering, 'terms', $$v) },
            expression: 'filtering.terms'}
        }
      ),
      _vm._v(' '),
      _c('q-select', {staticClass: 'no-margin text-right',
        attrs: {'options': _vm.filterFields, 'simple': ''},
        model: {
          value: (_vm.filtering.field),
          callback: function ($$v) { _vm.$set(_vm.filtering, 'field', $$v) },
          expression: 'filtering.field'
        }
      }
      )
    ]
    , 1)
},
staticRenderFns: [],
name: 'q-table-filter',
components: {
  QSearch: QSearch,
  QSelect: QSelect
},
props: ['filtering', 'columns', 'labels'],
computed: {
  filterFields: function filterFields () {
    var cols = this.columns.map(function (col) {
      return {
        label: col.label,
        value: col.field
      }
    })

    return [{label: this.labels.allCols, value: ''}].concat(cols)
  }
}
}
// eslint-disable-next-line no-unused-vars
var Filter = {
  data: function data () {
    return {
      filtering: {
        field: '',
        terms: ''
      }
    }
  },
  watch: {
    // eslint-disable-next-line
    'filtering.terms': function filtering_terms () {
      this.resetBody()
    }
  },
  computed: {
    filteringCols: function filteringCols () {
      return this.cols.filter(function (col) { return col.filter })
    }
  },
  methods: {
    filter: function filter (rows) {
      var this$1 = this

      var
        field = this.filtering.field,
        terms = this.filtering.terms.toLowerCase()

      if (field) {
        return rows.filter(function (row) { return (row[field] + '').toLowerCase().indexOf(terms) > -1 })
      }

      return rows.filter(function (row) {
        return this$1.filteringCols.some(function (col) { return (row[col.field] + '').toLowerCase().indexOf(terms) > -1 })
      })
    }
  },
  components: {
    TableFilter: TableFilter
  }
}
export default {
  components: {
    QDataTable, QField, QInput, QCheckbox, QSelect, QSlider, QBtn, QIcon, QTooltip, QCollapsible, QSearch
  },
  methods: {
    changeMessage (props) {
      props.rows.forEach(row => {
        row.data.message = 'Gogu'
      })
    },
    deleteRow (props) {
      props.rows.forEach(row => {
        this.table.splice(row.index, 1)
      })
    },
    refresh (done) {
      this.timeout = setTimeout(() => {
        done()
      }, 5000)
    },
    selection (number, rows) {
      console.log(`selected ${number}: ${rows}`)
    },
    rowClick (row) {
      console.log('clicked on a row', row)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  },
  data () {
    return {
      table,
      config: {
        title: 'Data Table',
        refresh: true,
        noHeader: false,
        columnPicker: true,
        leftStickyColumns: 0,
        rightStickyColumns: 2,
        bodyStyle: {
          height: 'auto'
        },
        rowHeight: '50px',
        responsive: true,
        pagination: {
          rowsPerPage: 15,
          options: [5, 10, 15, 30, 50, 500]
        }, // (optional) Select one or more rows for an action
        // "single" adds a column with radio buttons for single row selection
        // "multiple" adds a column with checkboxes for multiple row selection
        // omitting the property will result in no selection column at all
        selection: 'multiple',
        labels: {
          selection: this.$t('data-table.selection'),
          columns: this.$t('data-table.columns'),
          allCols: this.$t('data-table.allCols'),
          rows: this.$t('data-table.rows'),
          selected: {
            singular: this.$t('data-table.selected.singular'),
            plural: this.$t('data-table.selected.plural')
          },
          clear: this.$t('data-table.clear'),
          search: this.$t('data-table.search'),
          all: this.$t('data-table.all')
        }
      },
      columns: [
        {
          label: 'Date',
          field: 'isodate',
          width: '140px',
          classes: 'bg-orange-2',
          filter: true,
          sort (a, b) {
            return new Date(a) - new Date(b)
          },
          format (value) {
            return new Date(value).toLocaleString()
          }
        },
        {
          label: 'Service',
          field: 'serviceable',
          format (value) {
            if (value === 'Informational') {
              return '<i class="material-icons text-positive" style="font-size: 22px">info</i>'
            }
            return value
          },
          width: '70px'
        },
        {
          label: 'Time Range',
          field: 'timerange',
          width: '80px',
          sort: true,
          type: 'number'
        },
        {
          label: 'Message',
          field: 'message',
          filter: true,
          sort: true,
          type: 'string',
          width: '500px'
        },
        {
          label: 'Source',
          field: 'source',
          filter: true,
          sort: true,
          type: 'string',
          width: '120px'
        },
        {
          label: 'Log Number',
          field: 'log_number',
          sort: true,
          type: 'string',
          width: '100px'
        }
      ],
      pagination: true,
      rowHeight: 50,
      bodyHeightProp: 'maxHeight',
      bodyHeight: 500
    }
  },
  watch: {
    pagination (value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination)
        this.config.pagination = false
        return
      }
      this.config.pagination = this.oldPagination
    },
    rowHeight (value) {
      this.config.rowHeight = value + 'px'
    },
    bodyHeight (value) {
      let style = {}
      if (this.bodyHeightProp !== 'auto') {
        style[this.bodyHeightProp] = value + 'px'
      }
      this.config.bodyStyle = style
    },
    bodyHeightProp (value) {
      let style = {}
      if (value !== 'auto') {
        style[value] = this.bodyHeight + 'px'
      }
      this.config.bodyStyle = style
    }
  }
}
</script>


<style>

</style>
