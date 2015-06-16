'use strict'

import $ from 'jquery'

let p = null

export default function () {

    if (p === null) {
        p = new Promise((res) => {
            $.ajax({
                url: 'data/score.json',
                dataType: 'json'
            }).done(data => {
                data.scorePartwise.part.forEach((part, numPart) => {
                    let sound, time, divisions;
                    part.measure.forEach( (measure, numMeasure) => {

                        // note is not always an array...
                        !Array.isArray(measure.note) && (measure.note = [measure.note])

                        // retrive direction.sound : tempos are indicated only on some measures of the first part
                        // if we are on the first part, we use the last direction found on the
                        // previous measures with sound defined
                        if(numPart === 0){
                           if('direction' in measure && 'sound' in measure['direction']){
                               sound = measure.direction.sound
                           }
                        }
                        // on other parts, we simply use the direction defined on the first part for the current
                        // num measure
                        else {
                            sound = data.scorePartwise.part[0].measure[numMeasure].computed.sound
                        }


                        // retrive attributes.division :
                        // Musical durations are commonly referred to as fractions: whole notes, half notes, quarter notes,
                        // and the like.
                        // While each musical note could have a fraction associated with it, MusicXML instead follows
                        // MIDI by specifying the number of divisions per quarter note *at the start of a musical part*,
                        // and then specifying note durations in terms of these divisions.
                        divisions = part.measure[0].attributes.divisions

                        // retrive attributes.time :
                        // if attributes time is not defined, we use the value of the previous measure
                        if('attributes' in measure && 'time' in measure.attributes){
                            time = measure.attributes.time
                        }else {
                            time = part.measure[numMeasure-1].computed.time
                        }


                        // each mesure is extended by the computed sound, divisions and time
                        $.extend(measure, {
                            computed: {
                                time: time,
                                sound: sound,
                                divisions: divisions
                            }
                        })
                    })
                })
                res(data)
            })
        })
    }
    return p
}