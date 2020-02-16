import React from 'react'
import BibMaitreRes from './assets/comparison_res.json';
import './GradientBorder.css';

//Note: Act like a return.
export const BibMaitre = () => (
        <div>
            <h2>Bib and Maitre restaurants</h2>
            {BibMaitreRes.map((BibMaitre, Name) => {
                return <div className='gradient-border'>
                            <p>Name: {BibMaitre.Name}</p>
                        </div>})}
        </div>
)
