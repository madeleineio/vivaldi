'use strict'

import $ from 'jquery/dist/jquery.js'

let p = null

export default function () {

    if (p === null) {
        p = new Promise((res) => {
            $.ajax({
                url: 'data/score.json',
                dataType: 'json'
            }).done(data => {
                // for each measures, we have to add attributes and direction attr taken from a previous measure if not defined
                data.scorePartwise.part.forEach(part => {
                    let { direction, attributes }  = part.measure[0]
                    part.measure.forEach( measure => {
                        // if direction or attributes exist, we set our vars
                        if('direction' in measure){
                            direction = measure['direction']
                        }
                        if('attributes' in measure){
                            attributes = measure['attributes']
                        }
                        measure = $.extend(measure, {
                            direction: direction,
                            attributes: attributes
                        })
                    })
                })
                res(data)
            })
        })
    }
    return p
}