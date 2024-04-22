// Définir un produit --> class Produit 
export default class Produit{

    // Le constructeur 
        constructor (id, nom, qte, photo){
            this._id = id; 
            this._nom = nom;  
            this._qte = qte;
            this._photo = photo;
        }
    
    // Les fonctions 
        affichNom(){
            return `${this._nom}`;
        }
    
        affichQte(){
            return `Quantité : ${this.qte}`;
        }
    
    
    // Les méthodes d'accès (getters)
        get id(){
            return this._id;  
    
        }
        get nom(){
            return this._nom;
        }
    
        get qte(){
            return this._qte
        }
        get photo(){
            return this._photo;
        }
    
    
    
    // Les méthodes de modifications / affectation 
        set nom(nvNom){
            return this._nom = nvNom; 
        }
    
        qteMoins(){
            if(this._qte >0){
                this._qte -=1;
    
            }
        }
        qtePlus(){
            this._qte +=1;
        }
    
    }