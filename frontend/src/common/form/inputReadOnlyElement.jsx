import React from 'react'
import Grid from '../layout/grid'

export default props => (
    <Grid cols={props.cols}>
        <div className='form-group'>
            <label htmlFor={props.name}>{props.label}</label>
            <input {...props.input} className='form-control'
                placeholder={props.placeholder}
                readOnly={props.blockItens && props.blockItens.length > 0 ? props.blockItens.includes(props.input.name) : false || props.readOnly}
                type={props.type} />
        </div>
    </Grid>

)
