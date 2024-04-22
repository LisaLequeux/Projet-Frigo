<script setup>
import { defineEmits } from 'vue';

const emit = defineEmits(["add"]);
</script> 

<!--Ajouter un produit à la liste du frigo-->
<template>
<div id="formulaire">
    <form @submit.prevent="$emit('add', nom, qte)">
        <label>Nom du produit à ajouter : </label>
        <input id="text" type="text" v-model="nom" placeholder="Produit à ajouter" required/>
        <br/>
        <label>En quelles quantités ajouter ce produit ?</label>
        <input id="quant" type="number" v-model="qte" placeholder="Quantité" step="1" min="1" required/>
        <br/>
        <input id="boutonValider" type="submit" value="Enregistrer"/>
        <br/>
    </form>
</div> 
</template>

<style>
#boutonValider{
    font-family: 'HelveticaNeue';
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    text-transform: uppercase;
    font-weight: bolder;
}

#boutonValider:hover{
    font-family: 'HelveticaNeue';
    background-color: rgb(83, 168, 124);
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
}

#text, #qte{
    font-family: 'HelveticaNeue';
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    text-align: left;
}
form{
    font-family: 'HelveticaNeue';
    display: flex;
    flex-direction: column;
    width: 400px;
    background-image: url("./images/frigo-vide.jpg");
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    font-size: 1em;
    font-weight: lighter;
    text-align: left;
}
form{
    font-family: 'HelveticaNeue';
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    font-size: 1em;
    font-weight: lighter;
    text-align: left;
}
#formulaire{
    font-family: 'HelveticaNeue';
    display: flex;
    height: 200px;
    align-items: flex-start;
    justify-content: left;
}
</style>