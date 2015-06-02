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
                data.scorePartwise.part.forEach((part, numPart) => {
                    let { direction, attributes }  = part.measure[0]
                    part.measure.forEach( (measure, numMeasure) => {
                        // retrive direction.sound : tempos are indicated only on some measures of the first part
                        // if we are on the first part, we use the last direction found on the
                        // previous measures with sound defined
                        if(numPart === 0){
                           if('direction' in measure && 'sound' in measure['direction']){
                               direction = measure['direction']
                           }
                        }
                        // on other parts, we simply use the direction defined on the first part for the current
                        // num measure
                        else {
                            direction = data.scorePartwise.part[0].measure[numMeasure].direction
                        }
                        // retrieve attributes : for each measure, if attributes attr is not specified,
                        // we use the one of the
                        // previous measure
                        if('attributes' in measure){
                            attributes = measure['attributes']
                        }
                        // each mesure is extended by the computed attributes and direction attr
                        $.extend(measure, {
                            attributes: attributes,
                            direction: direction
                        })
                    })
                })
                res(data)
            })
        })
    }
    return p
}