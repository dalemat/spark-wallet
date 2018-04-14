import { div, ul, li, a, span, button, small } from '@cycle/dom'
import { yaml, ago } from './util'

const perPage = 10

const home = ({ feed, feedStart, unitf, info, btcusd, peers, funds, conf: { expert } }) => div([

  info ? div('.row.mb-2', [
    div('.col-sm-6.mb-2', a('.btn.btn-lg.btn-primary.btn-block', { attrs: { href: '#/scan' } }, 'Pay'))
  , div('.col-sm-6.mb-2', a('.btn.btn-lg.btn-secondary.btn-block', { attrs: { href: '#/recv' } }, 'Request'))
  , expert ? div('.col-sm-6', a('.btn.btn-lg.btn-info.btn-block.mb-2', { attrs: { href: '#/logs' } }, 'Logs')) : ''
  , expert ? div('.col-sm-6', a('.btn.btn-lg.btn-warning.btn-block.mb-2', { attrs: { href: '#/rpc' } }, 'Console')) : ''
  ]) : ''

, ul('.list-group.payments', feed.slice(feedStart, feedStart+perPage).map(([ type, ts, msat, obj ]) =>
    li('.list-group-item', [
      div('.clearfix', [
        type === 'in' ? span('.badge.badge-success.badge-pill', `+${ unitf(msat) }`)
                      : span('.badge.badge-danger.badge-pill', `-${ unitf(msat) }`)
      , ago('.badge.badge-secondary.badge-pill.float-right', ts)
      ])
    , expert ? yaml(obj) : ''
    ])
  ))

, paging(feed.length, feedStart)

, expert ? yaml({ info, btcusd, funds, peers }) : ''
])

const paging = (total, start) => total <= perPage ? '' :
  div('.d-flex.justify-content-between.mt-2', [
    pageLink('newer', start > 0 ? ''+(start-perPage) : null)
  , small('.align-self-center.text-muted', `showing ${+start+1} to ${Math.min(total, +start+perPage)} of ${total}`)
  , pageLink('older', start+perPage < total ? start+perPage : null)
  ])

const pageLink = (label, start, active) =>
  start == null ? button('.btn.btn-sm.btn-link.invisible', label)
                : button('.btn.btn-sm.btn-link', { dataset: { feedStart: ''+start } }, label)

module.exports = { home }