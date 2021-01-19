import CartIcon from "./cart-icon.component"
import React from "react"
import {gql} from "apollo-boost"
import { graphql } from "react-apollo"
import {flowRight } from "lodash"
//import {Query, Mutation} from "react-apollo"

const TOGGLE_CART_HIDDEN = gql`
mutation ToggleCartHidden {
    toggleCartHidden @client
}
`
const GET_CART_ITEMS_COUNT = gql`
{
  itemsCount @client
}

`

const CartIconContainer = ({data: {itemsCount}, toggleCartHidden}) => {
    /*
    <Query query = { GET_CART_ITEMS_COUNT}>
    {
        ({data: {itemsCount}}) => 
        (<Mutation mutation = {TOGGLE_CART_HIDDEN}>
        {
            toggleCartHidden => <CartIcon toggleCartHidden = {toggleCartHidden} itemCount = {itemsCount} />
        }
    </Mutation>)
    }
    </Query>*/
    //console.log(props)
    return(
    <CartIcon toggleCartHidden = {toggleCartHidden} itemCount = {itemsCount}  />
)}

export default flowRight(
    graphql(GET_CART_ITEMS_COUNT),
    graphql(TOGGLE_CART_HIDDEN, {name: 'toggleCartHidden'})

    ) (CartIconContainer)