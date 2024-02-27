<script setup>
defineProps(["produit"]); 
</script>

<template>
    <!--Définir une ligne produit-->
<div id="produit">
    <div id="nomProduit">{{produit.nom}}</div>
    <br/>
    <img :src= produit.photo >
    <div id="quantiteProduit">{{produit.qte}}</div>
    <button id="plus" @click="$emit('eventUp', produit)">+</button>
    <button id="moins" @click="$emit('eventDown', produit)">-</button>
    <br/>
    <button id="supprimer" @click="$emit('eventSupp', produit.id)">Suppr.</button>
</div>
</template>

<style>
#produit{   
    margin: 20px;
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
    font-family: 'HelveticaNeue';
    font-size: 0.5em;
    text-align: left;
}

img{
    width: 100px;
    height: 100px;
    border-radius: 10px;
    border: solid 5px rgb(31, 213, 119);
}

#produit:hover{
    background-color: rgb(83, 168, 124);
    border-radius: 10px;
    border-bottom: solid 5px rgb(31, 213, 119);
}

#nomProduit{
    font-family: 'HelveticaNeue';
    font-weight: bolder;    
    text-align: center;
    color: black;
}

#quantiteProduit{
    font-family: 'HelveticaNeue';
    font-weight: bolder;
    text-align: center;
    color: black;
}

button{
    color:black;
    font-family: 'HelveticaNeue';
    font-weight: normal;
    text-align: center;
    background-color: rgb(83, 168, 124);
    padding: 1em;
    border-radius: 10px;
    border: solid 5px rgb(83, 168, 124);
    position: center;

}

#moins:hover{
    background-color: red;
    border-radius: 10px;
}

#plus:hover{
    background-color: green;
    border-radius: 10px;
}

#supprimer:hover{
    background-color: lightcoral;
    border-radius: 10px;
}

</style>