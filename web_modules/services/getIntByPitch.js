'use strict'

import d3 from 'd3'

const mappingStep = {
    // do
    'C': 0,
    // ré
    'D': 1,
    // mi
    'E': 2,
    // fa
    'F': 3,
    // sol
    'G': 4,
    // la
    'A': 5,
    // si
    'B': 6
}

export default function(pitch){
    // notes are from 0 to 62
    return pitch.octave * 7 + mappingStep[pitch.step]
}