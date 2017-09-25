// utils/helpers.js
import React from 'react'

export function getMetricMetaInfo(metric){


    const info = [
        {
            appPref: {
                text: "What app should always be active?",
                options: ['Uber','Lyft'],
                getUnit(distance){
                    return ''
                },
            },
            appTimeout: {
                text: "And when should the other come on-line?",
                options: ['Always','if no ride for 5 min',
                    'if no ride for 10 min', 'if no ride for 15 min'],
                getUnit(distance){
                    return ''
                },
            }
        },
        {
            maxPickupDistance: {
                text: "How far will you drive for a pick-up?",
                options: ['5','10','20','Any'],
                getUnit(distance){
                    return parseInt(distance, 10) ? 'mins' : ''
                },
            },
            LowestPassengerRating: {
                text: "What's the lowest passenger rating you'll accept?",
                options: ['4.5','4.0','3.5','Any'],
                getUnit(distance){
                    return ''
                },
            }
        },
        {
            carPoolPref: {
                text: "Do you want rides from carpool services?",
                options: ['Yes','No'],
                getUnit(distance){
                    return ''
                }
            }
        }
    ]

    return typeof metric === 'undefined'
        ? info
        : info[metric]
}
