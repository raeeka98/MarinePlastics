import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import RibScanRow from '../TableRows/RibScanRow';
import AccumulationSurveyRow from '../TableRows/AccumulationSurveyRow';

import '../accordion-styles.css';


class SurfaceRibScan extends Component {
  constructor(props){
    super(props)
  }

  render() {
    let categories = [
        {name: 'Cigarette Butts', id: 'cigaretteButts'},
        {name: 'Fishing Line / Polypropylene Rope', id: 'fishingLineRope'},
        {name: 'Plastic Cups', id: 'plasticCups'}
    ];

    let tableRows = categories.map(category => {
        return(
            <RibScanRow id={category.id} name={category.name}/>
        );
    });

    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Surface Rib Scan</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <form>

                  <div className="uk-grid uk-child-width-1-5">
                    <div></div>
                    <div><h4>Rib #1</h4></div>
                    <div><h4>Rib #2</h4></div>
                    <div><h4>Rib #3</h4></div>
                    <div><h4>Rib #4</h4></div>
                  </div>

                  <div className="uk-grid uk-child-width-1-5">
                    <div><h5>Rib Start Point(m)</h5></div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #1 Start'
                        id='rib-1-start'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #2 Start'
                        id='rib-2-start'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #3 Start'
                        id='rib-3-start'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #4 Start'
                        id='rib-4-start'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                  </div>

                  <div className="uk-grid uk-child-width-1-5">
                    <div><h5>Rib End Point(m)</h5></div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #1 End'
                        id='rib-1-end'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #2 End'
                        id='rib-2-end'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #3 End'
                        id='rib-3-end'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                    <div>
                      <input
                        type='string'
                        placeholder='Rib #4 End'
                        id='rib-4-end'
                        className='uk-input uk-margin'
                        required
                        />
                    </div>
                  </div>

                  <hr></hr>

                  <div className="uk-grid">
                      <div className="uk-width-1-5"></div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #1 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #1 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #2 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #2 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #3 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #3 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                      <div className="uk-width-1-5">
                          <div className="uk-grid">
                            <div className="uk-width-1-2">
                                <center><label>Rib #4 Fresh</label></center>
                            </div>
                            <div className="uk-width-1-2">
                                <center><label>Rib #4 Weathered</label></center>
                            </div>
                          </div>
                      </div>
                  </div>

                  {tableRows}

              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurfaceRibScan
