import React from 'react'
import BibRes from './assets/bib_res.json';
import './GradientBorder.css';

//Note: Act like a return.
export const Bib = () => (
        <div>
            <h2>Bib restaurants</h2>
            {BibRes.map((Bib, Name) => {
                return <div className='gradient-border'>
                            <p>Name: {Bib.Name}</p>
                            <p>Cuisine: {Bib.Cuisine}</p>
                            <p>Place: {Bib.Lieu}</p>
                        </div>})}
        </div>
)
