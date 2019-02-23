import React, { Component } from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionItemTitle,
    AccordionItemBody,
} from 'react-accessible-accordion';

import '../accordion-styles.css';

class SurfaceRibScan extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return(
      <AccordionItem className="accordion__item">
          <AccordionItemTitle className="accordion__title accordion__title--animated">
              <h2>Surface Rib Scan</h2>
              <div className="accordion__arrow" role="presentation" />
          </AccordionItemTitle>
          <AccordionItemBody className="accordion__body">
              <form>

                  <div className="uk-grid uk-child-width-1-6">
                    <div></div>
                    <div><h4>Rib #1</h4></div>
                    <div><h4>Rib #2</h4></div>
                    <div><h4>Rib #3</h4></div>
                    <div><h4>Rib #4</h4></div>
                    <div></div>
                  </div>

                  <div className="uk-grid uk-child-width-1-6">
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
                    <div></div>
                  </div>

                  <div className="uk-grid uk-child-width-1-6">
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
                    <div></div>
                  </div>

                  

              </form>
          </AccordionItemBody>
      </AccordionItem>
    )
  }

}

export default SurfaceRibScan
