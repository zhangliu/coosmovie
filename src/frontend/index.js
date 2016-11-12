/* global document */
import React from 'react'
import {render} from 'react-dom'

import IndexRouter from './routers/index'

render((
  <IndexRouter/>
), document.getElementById('container'))
