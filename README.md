# ASET - Campagne de solidarité

Site web statique pour la collecte de dons et la transparence des contributions.

## Structure
- index.html : page principale
- style.css : styles du site
- script.js : logique du formulaire, modal de paiement et stockage local
- images/ : ressources visuelles

## Lancer localement
```bash
python3 -m http.server 8000
```
Puis ouvrir http://127.0.0.1:8000/

## Déploiement
Ce projet est prêt pour un hébergement statique simple :
- Netlify
- Vercel
- GitHub Pages
- Nginx / Apache

Déposez simplement les fichiers racine du projet sur l’hôte.
