import './App.module.css';
import classes from './App.module.css';
import {useEffect, useRef, useState} from "react";
import PricePer from "./Components/PricePer";
import comb from './Srv/Honeycomb_texture.svg'
function App() {

    const [formValues, setFormValues] = useState({
        lbPrice: 0,
        multiplier: 0
    })

    const [combWeight, setCombWeight] = useState(100)

    useEffect(() => {
        localStorage.getItem("formValues") && setFormValues({...formValues, ...JSON.parse(localStorage.getItem("formValues"))})
    }, []);

    function handleFormUpdate(e) {
        e.preventDefault()
        localStorage.setItem("formValues", JSON.stringify({...formValues, [e.target.id]: e.target.value}))
        setFormValues({...formValues, [e.target.id]: e.target.value})
    }

    const pricePerGram = () => {
        return formValues.lbPrice / 453.592
    }

    return (
        <div className={classes.App}>
            <div className={classes.Backdrop}><h1>Honey Calculator</h1>
                <div className={classes.Inputs}>
                    <form>
                        <ul>
                            <li>
                                <p>$</p><input id={"lbPrice"} value={formValues.lbPrice} onChange={handleFormUpdate}/>
                                <label>per lb</label>
                            </li>
                            <li>
                                <p>x</p><input id={"multiplier"} value={formValues.multiplier}
                                               onChange={handleFormUpdate}/>
                                <label>cut-comb multiplier</label>
                            </li>
                        </ul>
                    </form>
                </div>
                <div className={classes.Price}>
                    {/*<h2>Price</h2>*/}
                    <ul>
                        <li>
                            <h3>Weight</h3>
                            <h3>Runny</h3>
                            <h3>Comb</h3>
                        </li>
                        <PricePer title={"lb"} price={formValues.lbPrice} multiplier={formValues.multiplier}/>
                        <PricePer title={"12oz"} price={formValues.lbPrice / 16 * 12}
                                  multiplier={formValues.multiplier}/>
                        <PricePer title={"8oz"} price={formValues.lbPrice / 16 * 8} multiplier={formValues.multiplier}/>
                        <PricePer title={"1kg"} price={pricePerGram() * 1000} multiplier={formValues.multiplier}/>
                        <PricePer title={"100g"} price={pricePerGram() * 100} multiplier={formValues.multiplier}/>
                    </ul>
                </div>
                <div className={classes.Comb}>
                    <h2>Comb Price</h2>
                    <form>
                        <ul>
                            <li>
                                <input id={"grams"} value={combWeight}
                                       onChange={(e) => setCombWeight(e.currentTarget.value)}/>
                                <label>grams</label>
                            </li>
                        </ul>
                    </form>
                    <h2>
                        ${parseFloat(pricePerGram(formValues) * combWeight * formValues.multiplier).toFixed(2)}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default App;
