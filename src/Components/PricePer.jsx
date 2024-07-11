function PricePer({title, price, multiplier}) {
    return (<li>
        <p>{title}</p>
        <p>${parseFloat(price).toFixed(2)}</p>
        <p>${parseFloat(price*multiplier).toFixed(2)}</p>

    </li>);
}

export default PricePer;