import React from 'react'
import styles from './calculatorStyle.css'
import { useState } from 'react'
import * as math from 'mathjs'

function CalculatorSmall() {

    
    function isNumeric(str){
        const num = ['0','1','2','3','4','5','6','7','8','9','0','.']
        return num.includes(str)
    }

    function isOperand(str){
        const op = ['*','/','+','-']
        return op.includes(str)
    }


    onkeydown = (event) => {
        console.log('called : ' + event.key);
        const key = event.key
    
        if(key === '=' || key === 'Enter')
            calculate()
        else if(key === 'Backspace' || key === 'delete')
            calcInput('','clr','')
        else if(isNumeric(key))
            calcInput(key,'num',key)
        else if(isOperand(key)){

            if(key === '*')
                calcInput('×','op',key)
            else if(key === '/')
                calcInput('÷','op',key)
            else if(key === '-')
                calcInput('−','op',key)
            else if(key === '+')
                calcInput('+','op',key)
        }
          
    }


    const [display,setDisplay] = useState('0')
    const [displayState, setDisplayState] = useState('')
    const [stack, setStack] = useState("")

    const calcInput = (text,type,value) => {

        if(text === '='){
            calculate()
            return
        }

        if(type === 'aClr'){
            setDisplay('0')
            setStack("")
            setDisplayState('')
            return
        }

        if(type === 'clr'){
            if(display !== '0'){

                setDisplay(display.substring(0,display.length -1))
                setStack(stack.substring(0,stack.length -1))
                setDisplayState('')

                if(display.length <= 1)
                    setDisplay('0')
            }
            return
        }

        if(display.length > 10)
            return
        
        setDisplayState('')

        if(type === 'num'){
            
            if(display === '0')
                setDisplay(text)
            else
                setDisplay(display + text)

            setStack(stack + value)


        } else if(type === 'op'){

    
            if(display === '0'){
                if(value === '*' || value === '/' || value === '%')
                return
                setDisplay(text)
            }
            else
                setDisplay(display + text)

            setStack(stack + value)
        
 
        }

       
    }

    const calculate = () => {

        if(display === '0')
            return setDisplayState('res')

        try{
            const res = math.round(math.evaluate(stack),4)
            setDisplay(res + "")
            setDisplayState('res')
            setStack(res + "")
        } catch(e) {
            console.log(e);
            setDisplayState('err')
            setDisplay('Synatx Error!')
        }
    }


    const CalcButton = (props) => {

        const text = props.text
        const classes = props.classes
        return (
            <div className={classes} onClick={() => calcInput(text,props.type,props.value)} >
                {text}
            </div>
        )
    }


    return (
        <div className="container">
            <div className='display'>

                <div className={"displayText " + displayState}>
                    {display}
                </div>
            </div>

            <div className='buttonContainer'>

                <div className='btn-row'>
                    <CalcButton text="AC" classes='btn btnS1' type='aClr' value='aClr'/>
                    <CalcButton text="C" classes='btn btnS1' type='clr' value='clr'/>
                    <CalcButton text="%" classes='btn btnS1' type='op' value='%'/>
                    <CalcButton text="÷" classes='btn btnOp' type='op' value='/'/>
                </div>
                <div className='btn-row'>
                    <CalcButton text="7" classes='btn btnNum' type='num' value='7'/>
                    <CalcButton text="8" classes='btn btnNum' type='num' value='8'/>
                    <CalcButton text="9" classes='btn btnNum' type='num' value='9'/>
                    <CalcButton text="×" classes='btn btnOp' type='op' value='*'/>
                </div>
                <div className='btn-row'>
                    <CalcButton text="4" classes='btn btnNum' type='num' value='4'/>
                    <CalcButton text="5" classes='btn btnNum' type='num' value='5'/>
                    <CalcButton text="6" classes='btn btnNum' type='num' value='6'/>
                    <CalcButton text="−" classes='btn btnOp' type='op' value='-'/>
                </div>
                <div className='btn-row'>
                    <CalcButton text="3" classes='btn btnNum' type='num' value='3'/>
                    <CalcButton text="2" classes='btn btnNum' type='num' value='2'/>
                    <CalcButton text="1" classes='btn btnNum' type='num' value='1'/>
                    <CalcButton text="+" classes='btn btnOp' type='op' value='+'/>
                </div>
                <div className='btn-row'>
                    <CalcButton text="0" classes='btn btnNum btn0' type='num' value='0'/>
                    <CalcButton text="." classes='btn btnNum' type='num' value='.'/>
                    <CalcButton text="=" classes='btn btnOp' type='op' value='='/>
                </div>

            </div>
        </div>
    )
}

export default CalculatorSmall
