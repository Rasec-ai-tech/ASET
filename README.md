# ASET - Campagne de solidarité

Site web statique conçu pour collecter des dons via un parcours 100 % côté navigateur, sans backend ni base de données.

## Ce que fait le site
- Le formulaire de don collecte : nom, téléphone, email, montant et message optionnel.
- L’utilisateur choisit un moyen de paiement : Orange Money, Moov Money ou Wave.
- Une modale affiche les instructions de paiement adaptées.
- En validant, le site ouvre WhatsApp avec un message pré-rempli adressé à l’association.

## Architecture
- [index.html](index.html) : structure du site, formulaire de don, section contact et modale de paiement.
- [style.css](style.css) : styles du layout, des cartes, de la modale et des composants d’interface.
- [script.js](script.js) : validation du formulaire, affichage dynamique des instructions de paiement et ouverture du message WhatsApp.
- [images](images) : logos et visuels de la campagne.
- [videos](videos) : médias utilisés dans les sections visuelles.

## Flux de don réel
1. L’utilisateur remplit le formulaire.
2. Le montant minimum est vérifié côté client.
3. La modale s’ouvre avec les instructions de paiement correspondant au canal choisi.
4. Le don est effectué dans l’application mobile du support de paiement.
5. La référence de la transaction est saisie dans le champ dédié.
6. Le bouton final ouvre WhatsApp avec le message pré-rempli pour l’association.

## Lancer localement
```bash
python3 -m http.server 8000
```
Puis ouvrir :
```text
http://127.0.0.1:8000/
```

## Déploiement
Le projet peut être déployé sur n’importe quel hébergement statique, par exemple :
- Netlify
- Vercel
- GitHub Pages
- Nginx / Apache

Il suffit de publier les fichiers du dossier racine tel quel.
