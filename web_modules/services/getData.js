'use strict'

import $ from 'jquery/dist/jquery.js'

let p = null

export default function () {

    if (p === null) {
        p = new Promise((res) => {
            $.ajax({
                url: 'data/score.json',
                dataType: 'json'
            }).done(res)
        })
    }
    return p
}