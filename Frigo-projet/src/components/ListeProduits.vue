<script setup>
import Produit from "../Produit";
import ProduitsPossibles from "./ProduitsPossibles.vue" ;
import AjouterProduit from "./AjouterProduit.vue";
import RechercherProduit from "./RechercherProduit.vue";
import { reactive } from "vue";
import { onMounted } from "vue";


// Liste des produits 
const produits = reactive([]) ;

// Liste des produits recherchés 
const rechercheProduits = reactive([]) ;

//URL de l'API : 
const url = "https://webmmi.iut-tlse3.fr/~pecatte/frigo/public/18/produits"


// ALGORYTHME METHODE GET POUR RÉCUPERER LES DONNÉES DE L'API (diapo 17 du cours)
function getToDo(){
    //les options de l'API fetch
    let fetchOptions = { method: 'GET' }
    // executer la req AJAX
    fetch(url, fetchOptions) 
    .then( (response) => {
        return response.json() 
    })
    .then( (dataJSON) => {
        produits.splice(0, produits.length)
        dataJSON.forEach((v)=>produits.push(new Produit(v.id, v.nom, v.qte, v.photo)))

    })
    .catch( (error) => {
        console.log(error) 
    })
}
//fonction pour récupérer une image aléatoire de l'API Unsplash avec un mot-clé donné
// clé d'api = -SWQI_bi8pRS5YvpZyKsl0EwlY68G9YiDoze7sFlBRg
async function getImageFromUnsplash(keyword) {
  try {
    const response = await fetch('https://api.unsplash.com/photos/random?query='+keyword+'&lang=fr&client_id=-SWQI_bi8pRS5YvpZyKsl0EwlY68G9YiDoze7sFlBRg&lang=fr');
    const data = await response.json();

    if (data.urls && data.urls.small) {
      return data.urls.small; // Récupérer l'URL de l'image
    } else {
      throw new Error('Aucune image trouvée pour ce mot-clé.');
    }
  } catch (error) {
    console.error('Erreur lors de la recherche d\'image :', error);
    return null;
  }
}

// ALGORYTHME POUR AJOUTER UN PRODUIT À LA LISTE 
async function produitNouveau(nom, qte) {
  let urlimage = await getImageFromUnsplash(nom) // Récupérer une image aléatoire avec la méthode getImageFromUnsplash et le nom du produit donné par l'utilisateur
  console.log(nom, qte)
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const fetchOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({nom: nom, qte: qte, photo: urlimage})
  };
  fetch(url, fetchOptions)
      .then((response) => {
        return response.json()
      })
      .then((dataJSON) => {
        console.log(dataJSON)
        getToDo()
      })
      .catch((error) => console.log(error));
}


// ALGORYHTME POUR MODIFIER UN PRODUIT :
// 1) ALGORYHTME POUR AUGMENTER DE 1 QUANTITE D'UN PRODUIT 
function produitPlus(pdt){
  pdt.qtePlus()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {method:"PUT", headers: myHeaders, body: JSON.stringify({"id":pdt.id, "nom":pdt.nom, "qte":pdt.qte, "photo":pdt.photo})};
    fetch(url,fetchOptions)
    .then((response) => {
        return response.json()
    })
    .then((dataJSON) => {
      console.log(dataJSON)
        getToDo()
    })
    .catch((error) => console.log(error)); 
}

// 2) ALGORYHTME POUR DIMINUER DE 1 QUANTITE D'UN PRODUIT 
function produitMoins(pdt){
  console.log(pdt)
  pdt.qteMoins()
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {method:"PUT", headers: myHeaders, body: JSON.stringify({"id":pdt.id, "nom":pdt.nom, "qte":pdt.qte, "photo":pdt.photo})};
    fetch(url,fetchOptions)
    .then((response) => {
        return response.json()
    })
    .then((dataJSON) => {
        // en cas de produit à 0 quantité, il faut le supprimer de la liste :
        if(pdt.qte<1){
            produitSupp(pdt.id)
        }
        getToDo()
    })
    .catch((error) => console.log(error)); 
}

// ALGORYTHME POUR SUPPRIMER UN PRODUIT PEUT IMPORTE SA QUANTITE (A PARTIR DE L'ID)
function produitSupp(id){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const fetchOptions = {method:"DELETE", headers: myHeaders, body: JSON.stringify({libelle:id})};
    fetch(url+`/${id}`,fetchOptions)
    .then((response) => {
        return response.json()
    })
    .then((dataJSON) => {
        getToDo()
    })
    .catch((error) => console.log(error)); 
}


// ALGORYTHME POUR GÉRER LES RECHERCHES PAR ID / RÉCUPÉRER LES INFOS D'UN PRODUIT (+ MODIFIER URL) 
function rechercheParNom(nom){
  const fetchOptions = { method: "GET" };

  fetch(url+"?search="+nom, fetchOptions)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        rechercheProduits.splice(0, rechercheProduits.length);
        dataJSON.forEach((v) => rechercheProduits.push(new Produit(v.id, v.nom, v.qte, v.photo)));

      })
      .catch((error) => console.log(error));
}
// Cycle de vie : pour que les mises à jour du changement de données se fasse automatiquement
onMounted(() => {
  getToDo()
});
</script>

<template>
    <h3>Que voulez-vous faire ?</h3>
    <br/>
    <div>
        <!--Liste des produits du Frigo-->
        <h3>Voir ce que le Frigo contient :</h3>
        <div id="contenuFrigo">
            <ul>
                <li v-for="(produit) in produits" :key=[produit.id]>
                <ProduitsPossibles @eventDown="produitMoins" @eventUp="produitPlus" @eventSupp="produitSupp" v-bind:produit="produit"/>
                </li>
            </ul>
        <br/>
        </div>

        <!--Ajouter un nouveau produit à la liste-->
        <h3>Ajouter un nouveau produit :</h3>
        <div id="Ajouter">
            <AjouterProduit @add="produitNouveau"/>
        <br/>
        <br/>
        <br/>
        <br/>
        </div>

        <!--Rechercher un produit-->
        <h3>Rechercher un produit :</h3>
        <div id="Rechercher">
            <RechercherProduit @Rechercher="rechercheParNom"/>
        <br/>
        </div>
        <!--Résultat du produit recherché-->
        <h3>Voir les résultats de recherche du produit :</h3>
        <div id="ResultatRecherche">
          <li v-for="(produit) in rechercheProduits" :key=[produit.id]>
            <ProduitsPossibles @eventDown="produitMoins" @eventUp="produitPlus" @eventSupp="produitSupp" v-bind:produit="produit"/>
          </li>
        </div>

    </div>
</template>
    
<style scoped>
h3 {
    color:rgb(83, 168, 124);
    font-family: 'HelveticaNeue';
    font-weight: bolder;
    font-size: 2em;
    margin: 5px;
    text-align: left;
    border-radius: 10px;
    border: solid 5px rgb(83, 168, 124);
    background-color: white;
}

#contenuFrigo{
    font-size: 2em;
    color:rgb(83, 168, 124);
    overflow: hidden;
}

#contenuFrigo ul{
    display: flex;
    flex-wrap: wrap;
}

#contenuFrigo li{
    list-style-type: none;
    position: center;
}

#Ajouter{
  margin: 20px; 
}

#Rechercher{
  margin: 20px; 
}

#ResultatRecherche{
  margin: 20px; 
  display: flex;
  flex-wrap: wrap;
  font-size: 2em;
  color:black;
  overflow: hidden;
  text-align: center;
}

</style>