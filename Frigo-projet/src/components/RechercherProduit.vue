<script>
import Produit from '@/produit';
import { defineEmits } from 'vue';

const emit = defineEmits(["Rechercher"]);
</script> 

<!--Formulaire de recherche pour trouver un produit-->
<template>
<div id="formulaire">
    <form @submit.prevent="$emit('Rechercher', nom)">
        <label>Ici le nom du produit recherché...</label>
        <input id="text" type="text" v-model="nom" placeholder="Produit à rechercher" required>
        <br/>
        <input id="BoutonValider" type="submit" value="Rechercher"/>
        <br/>
    </form>
</div>
</template>

<style>
#BoutonValider{
    font-family: 'HelveticaNeue';
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    text-transform: uppercase;
    font-weight: bolder;
}
#text{
    font-family: 'HelveticaNeue';
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgba(31, 213, 119);
    text-align: left;
    color: black; 
}

form{
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    font-family: 'HelveticaNeue';
    font-size: 1em;
    font-weight: bolder;
    text-align: left;
}
#formulaire{
    display: flex;
    height: 200px;
    align-items: left;
    justify-content: left;
}
</style>