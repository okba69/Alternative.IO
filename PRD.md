# PRD du SaaS communautaire d’alternatives gratuites

## 1. Statut du document

Version : 1.0

Statut : prêt pour décision de lancement du développement

Nature : document de référence produit pour le MVP

Source de cadrage : cadrage MVP validé dans le livrable précédent du projet

Objectif de ce document : transformer le cadrage validé en exigences produit vérifiables, parcours détaillés, contrat de données, règles de confiance, critères d’acceptation, indicateurs et plan de livraison.

Ce document ne constitue pas une preuve que des données externes ont été vérifiées. Toute fiche réelle devra être vérifiée au moment de sa rédaction ou de sa revue. Les exemples de données de développement devront être explicitement signalés comme démonstration.

## 2. Résumé exécutif

Le produit est un catalogue public et communautaire qui aide une personne à trouver une solution gratuite, freemium, open source ou auto hébergée à la place d’un outil payant.

La promesse principale n’est pas de lister le plus grand nombre de solutions. Elle consiste à rendre la décision compréhensible et contrôlable : statut tarifaire précis, fonctions couvertes, limites, plateformes, mode d’installation, sources, date de vérification et niveau de confiance.

Le MVP comprend une recherche publique, des filtres, des fiches détaillées, une comparaison de deux ou trois alternatives, des astuces communautaires, un formulaire de contribution, une file de modération et un mécanisme de signalement.

Aucune contribution en attente ne doit être publique. Aucun contenu externe ne doit être importé ou publié automatiquement. Aucune décision de publication ne doit être prise uniquement par un modèle génératif.

## 3. Problème à résoudre

Les personnes qui cherchent à réduire leurs dépenses logicielles rencontrent plusieurs difficultés.

1. Le terme gratuit recouvre des réalités différentes : quota limité, fonctions réduites, usage personnel, essai temporaire, code source disponible ou hébergement à financer.
2. Les comparatifs existants mélangent souvent information éditoriale, publicité, affiliation et avis non vérifiés.
3. Les limites importantes sont rarement présentées au même niveau que les bénéfices.
4. Les prix, quotas et fonctions changent dans le temps.
5. Une solution techniquement équivalente peut exiger une compétence ou une infrastructure différente.
6. Les contributions de la communauté peuvent être utiles, mais elles nécessitent une revue avant publication.

Le produit doit donc réduire le temps de recherche tout en rendant visibles les incertitudes et les coûts cachés.

## 4. Vision et proposition de valeur

### 4.1 Vision

Devenir une référence de confiance pour choisir une alternative logicielle adaptée à un besoin concret et à un budget nul ou réduit.

### 4.2 Proposition de valeur

Pour un visiteur qui cherche à remplacer un outil payant, le produit fournit :

1. Une recherche par outil, catégorie et besoin.
2. Une fiche lisible en moins d’une minute.
3. Un statut tarifaire détaillé au lieu d’un simple oui ou non.
4. Les fonctions couvertes et les limites dans la même vue.
5. Les plateformes et modes d’installation visibles.
6. La date de vérification et le niveau de confiance.
7. Les références déclarées et leur état de revue.
8. Des astuces pratiques rédigées par la communauté et modérées.
9. Une comparaison courte de deux ou trois options.

### 4.3 Positionnement

Le produit est un catalogue de confiance, pas un annuaire exhaustif, une place de marché, un comparateur affilié ou un moteur de recommandation autonome.

## 5. Objectifs du MVP

### 5.1 Objectifs principaux

1. Permettre à un visiteur de trouver une fiche approuvée depuis la page d’accueil en trois actions principales au maximum.
2. Permettre de comprendre immédiatement le type de gratuité et les principales limites.
3. Garantir qu’une contribution en attente reste invisible dans le catalogue public.
4. Permettre à un modérateur de prendre une décision explicable et traçable.
5. Permettre à un visiteur de signaler une information obsolète ou inexacte.
6. Vérifier la persistance d’une contribution après rechargement.
7. Mesurer la recherche, l’ouverture des fiches, la comparaison, les contributions et les décisions de modération sans collecter plus de données personnelles que nécessaire.

### 5.2 Critères de réussite produit

Le MVP sera considéré utile si les vérifications suivantes sont réussies avec un jeu de données de démonstration clairement marqué.

1. Une recherche connue retourne au moins une fiche approuvée pertinente.
2. Une fiche expose le type de gratuité, les limites, la date de vérification et les références.
3. Une comparaison met en évidence les différences de fonctions et de limites.
4. Une contribution valide est enregistrée avec le statut en attente.
5. Le rechargement restitue la contribution dans la file de modération.
6. L’approbation rend uniquement la version approuvée visible publiquement.
7. Un rejet conserve le motif et l’historique.
8. Un signalement est visible par le modérateur et peut être résolu.
9. Aucun parcours principal ne produit d’erreur console non traitée.

### 5.3 Objectifs exclus du MVP

1. Maximiser le nombre de fiches.
2. Automatiser la collecte de données sur des sites externes.
3. Garantir l’équivalence fonctionnelle entre deux outils.
4. Fournir un classement commercial ou sponsorisé.
5. Construire une recommandation générative qui décide seule.
6. Créer une communauté complète avec messagerie, réputation ou récompenses.

## 6. Périmètre fonctionnel

### 6.1 Fonctionnalités incluses

1. Catalogue public des outils remplacés et des alternatives.
2. Recherche textuelle déterministe.
3. Filtres par catégorie, statut tarifaire, plateforme, mode d’installation, confiance et fraîcheur de la vérification.
4. Fiche détaillée d’une alternative approuvée.
5. Comparaison de deux ou trois alternatives.
6. Affichage du statut de vérification.
7. Affichage de la date de dernière vérification.
8. Affichage des références déclarées.
9. Formulaire de soumission d’une alternative ou d’une astuce.
10. Détection de doublons probables avant enregistrement.
11. Confirmation applicative après contribution.
12. File de modération.
13. Actions de modération : approuver, corriger puis approuver, demander une vérification, rejeter et dépublier.
14. Motif obligatoire pour les décisions qui ne sont pas une approbation simple.
15. Journal des événements de modération.
16. Formulaire de signalement.
17. Protection minimale contre le spam.
18. SEO de base pour les fiches approuvées.
19. Jeu de fixtures de démonstration sans secret et marqué comme tel.
20. Vérification de la persistance après rechargement.

### 6.2 Fonctionnalités exclues

1. Paiement, abonnement et marketplace.
2. Import automatique depuis une source externe.
3. Scraping massif ou contournement d’une protection d’accès.
4. Publication automatique vers un réseau social, un email ou une autre plateforme.
5. Messagerie privée.
6. Extension navigateur.
7. Application mobile native.
8. Compte obligatoire pour consulter le catalogue.
9. Système de réputation avancé.
10. Classement rémunéré.
11. Synchronisation avec un compte tiers.
12. Stockage de token, cookie, mot de passe ou secret.
13. Recommandation générative non contrôlée.

## 7. Utilisateurs et rôles

### 7.1 Visiteur

Le visiteur consulte le catalogue sans compte.

Droits :

1. Rechercher.
2. Filtrer.
3. Ouvrir une fiche approuvée.
4. Comparer des alternatives.
5. Consulter les astuces approuvées.
6. Soumettre une contribution selon la politique retenue.
7. Signaler une fiche.

Restrictions :

1. Aucun accès aux contenus en attente.
2. Aucun accès aux données personnelles d’un contributeur.
3. Aucun accès à la file de modération.
4. Aucun droit de publication directe.

### 7.2 Contributeur

Le contributeur soumet une alternative ou une astuce. Le MVP peut accepter une contribution sans compte si la protection anti spam et la politique de conservation sont définies. Si une authentification est retenue, elle doit rester légère et ne pas bloquer la consultation publique.

Droits :

1. Remplir le formulaire.
2. Recevoir une confirmation applicative.
3. Fournir un contact facultatif si la politique de conservation l’autorise.

Restrictions :

1. La contribution est toujours en attente avant revue.
2. Le contributeur ne peut pas modifier directement une fiche publique.
3. Aucun email ou message externe n’est envoyé automatiquement.

### 7.3 Modérateur

Le modérateur contrôle la qualité éditoriale et la visibilité publique.

Droits :

1. Voir les contributions et signalements en attente.
2. Vérifier les champs et les références.
3. Corriger le contenu soumis.
4. Demander une vérification complémentaire.
5. Approuver ou rejeter.
6. Dépublier une fiche.
7. Consulter l’historique des décisions.

Restrictions :

1. Toute action sensible doit être authentifiée et autorisée côté serveur.
2. Toute décision doit conserver son auteur et sa date.
3. Une suppression définitive de masse est interdite sans sauvegarde et validation dédiée.
4. Le modérateur ne doit pas exposer publiquement les coordonnées facultatives.

### 7.4 Administrateur technique

Ce rôle n’est pas nécessaire dans l’interface initiale. Il est réservé à la configuration de l’environnement, à la gestion des comptes de modération et aux opérations de maintenance contrôlées.

## 8. Parcours utilisateur détaillés

### 8.1 Parcours de recherche

Précondition : le catalogue contient au moins une fiche approuvée.

1. Le visiteur ouvre la page d’accueil.
2. Il saisit un outil, une catégorie ou un besoin.
3. Le système valide la recherche et affiche les résultats.
4. Le visiteur applique éventuellement un ou plusieurs filtres.
5. Chaque résultat affiche le nom, le type de gratuité, les plateformes, le mode d’installation, la confiance et la date de vérification.
6. Le visiteur ouvre une fiche.

Résultat attendu : la fiche consultée provient uniquement du contenu approuvé.

Cas d’erreur :

1. Recherche vide : afficher un état initial utile sans requête invalide.
2. Aucun résultat : afficher les filtres actifs et une suggestion de recherche élargie.
3. Filtre incompatible : expliquer pourquoi aucun résultat n’est disponible.
4. Fiche dépubliée pendant la navigation : afficher une page indisponible sans révéler de contenu interne.

### 8.2 Parcours de consultation d’une fiche

1. Le visiteur voit le nom et la description courte.
2. Il voit l’outil remplacé et le besoin ciblé.
3. Il voit le statut tarifaire exact.
4. Il voit les fonctions couvertes.
5. Il voit les limites et coûts possibles.
6. Il voit les plateformes et le mode d’installation.
7. Il voit le niveau de confiance et la date de vérification.
8. Il consulte les références déclarées.
9. Il consulte les astuces approuvées.
10. Il peut ajouter la fiche à une comparaison.
11. Il peut signaler une information problématique.

Règle : le mot gratuit ne doit jamais masquer une limite explicitement connue.

### 8.3 Parcours de comparaison

1. Le visiteur sélectionne deux ou trois alternatives.
2. Le système vérifie que les fiches sont approuvées.
3. Le système affiche les mêmes dimensions pour chaque option.
4. Les fonctions couvertes, limites, plateformes, mode d’installation, statut tarifaire et date de vérification sont comparés.
5. Les valeurs absentes sont affichées comme non renseignées, jamais comme équivalentes.
6. Le visiteur peut retirer une option ou revenir au catalogue.

Règle : la comparaison ne produit pas de gagnant automatique si les données sont incomplètes.

### 8.4 Parcours de contribution

1. Le visiteur ouvre le formulaire.
2. Il choisit une alternative ou une astuce.
3. Il renseigne les champs obligatoires.
4. Le système valide la longueur, le format et les URLs.
5. Le système signale un doublon probable sans bloquer à tort une contribution légitime.
6. Le contributeur confirme l’envoi.
7. Le système enregistre la contribution avec le statut en attente.
8. Le système affiche une confirmation locale ou applicative.

Règle : aucune donnée en attente n’est lisible depuis le catalogue public.

### 8.5 Parcours de modération

1. Le modérateur ouvre la file.
2. Il filtre par type, ancienneté et statut.
3. Il ouvre une contribution.
4. Il vérifie la cohérence des champs et les références.
5. Il corrige si nécessaire.
6. Il choisit une décision.
7. Il renseigne un motif lorsque la décision le requiert.
8. Le système enregistre une transition valide et un événement immuable.
9. Si la décision est une approbation, la version approuvée devient visible.
10. Le modérateur peut revenir à l’historique sans effacer les événements précédents.

### 8.6 Parcours de signalement

1. Le visiteur choisit un motif.
2. Il décrit le problème de manière facultative.
3. Le système limite la fréquence des signalements.
4. Le signalement est enregistré sans exposer l’identité du signaleur.
5. Le modérateur le traite dans la file.
6. La fiche est conservée, corrigée, marquée à revérifier ou dépubliée.
7. La résolution est enregistrée.

## 9. Contrat éditorial

### 9.1 Statuts tarifaires

Le champ `pricing_status` accepte uniquement les valeurs suivantes :

1. `free` : utilisation gratuite selon les conditions vérifiées.
2. `freemium` : offre gratuite avec limites ou fonctions payantes.
3. `open_source` : code source disponible, avec coût éventuel d’hébergement ou de maintenance.
4. `self_hosted` : déploiement possible par l’utilisateur, avec infrastructure non incluse.
5. `free_for_personal` : gratuité limitée à un usage personnel ou non commercial.
6. `trial_only` : accès temporaire, non considéré comme une alternative gratuite durable.
7. `unknown` : information insuffisante, fiche non publiable comme alternative gratuite confirmée.

### 9.2 Statuts de confiance

Le champ `verification_status` accepte uniquement les valeurs suivantes :

1. `verified` : source récente consultée et informations cohérentes.
2. `partially_verified` : certaines informations restent à confirmer.
3. `community_reported` : information déclarée par la communauté, non encore confirmée.
4. `stale` : vérification dépassée ou information signalée.

Une fiche communautaire ou obsolète peut exister dans la file interne. Elle ne doit pas être présentée comme une recommandation confirmée.

### 9.3 Conditions minimales de publication

Une fiche publique doit contenir :

1. Un nom.
2. Un identifiant lisible et stable.
3. Une URL valide.
4. Une catégorie.
5. Une description factuelle.
6. Un statut tarifaire précis.
7. Les principales fonctions couvertes.
8. Les limites connues.
9. Les plateformes et le mode d’installation lorsqu’ils sont pertinents.
10. Une date de vérification.
11. Au moins une référence déclarée ou une mention interne explicite indiquant qu’une vérification complémentaire est requise avant publication.
12. Un statut de modération approuvé.
13. Un événement de décision avec auteur et date.

### 9.4 Règles de rédaction

1. Ne pas promettre une équivalence complète sans preuve.
2. Ne pas présenter un essai comme une gratuité durable.
3. Ne pas confondre code source disponible et service hébergé gratuit.
4. Mentionner les limites et coûts d’infrastructure connus.
5. Associer les informations variables dans le temps à une date de vérification.
6. Séparer les faits vérifiés, les déclarations communautaires et les hypothèses.
7. Déclarer les liens affiliés éventuels.
8. Rejeter les contenus purement promotionnels, trompeurs ou non sourcés.

## 10. Modèle de données fonctionnel

Le stockage exact pourra être relationnel ou équivalent. Le contrat fonctionnel suivant doit rester stable.

### 10.1 Entité `tools`

1. `id` : identifiant interne.
2. `name` : nom public.
3. `slug` : identifiant public unique.
4. `website_url` : URL de référence.
5. `category_id` : catégorie.
6. `description` : description courte.
7. `status` : brouillon, publié ou archivé.
8. `created_at` : date de création.
9. `updated_at` : date de modification.

### 10.2 Entité `alternatives`

1. `id` : identifiant interne.
2. `tool_id` : outil remplacé.
3. `name` : nom public.
4. `slug` : identifiant public unique.
5. `website_url` : URL principale.
6. `description` : présentation factuelle.
7. `pricing_status` : statut tarifaire contrôlé.
8. `platforms` : plateformes prises en charge.
9. `deployment_modes` : modes d’installation.
10. `covered_features` : fonctions couvertes.
11. `limitations` : limites et coûts connus.
12. `verification_status` : niveau de confiance.
13. `last_verified_at` : date de vérification.
14. `source_urls` : références déclarées.
15. `moderation_status` : brouillon, en attente, approuvé, rejeté ou dépublié.
16. `public_version` : version actuellement visible.
17. `created_at` : date de création.
18. `updated_at` : date de modification.

### 10.3 Entité `tips`

1. `id` : identifiant interne.
2. `alternative_id` : alternative concernée.
3. `title` : titre court.
4. `body` : contenu de l’astuce.
5. `source_url` : référence éventuelle.
6. `author_label` : libellé public non identifiant par défaut.
7. `moderation_status` : en attente, approuvé, rejeté ou dépublié.
8. `created_at` : date de création.
9. `updated_at` : date de modification.

### 10.4 Entité `submissions`

1. `id` : identifiant interne.
2. `submission_type` : alternative ou astuce.
3. `payload` : contenu soumis dans une structure validée.
4. `submitter_contact_optional` : contact facultatif, séparé du contenu public.
5. `status` : en attente, en revue, approuvé, rejeté ou demande de vérification.
6. `reviewer_id` : auteur de la dernière décision.
7. `review_reason` : motif de décision.
8. `created_at` : date de réception.
9. `reviewed_at` : date de décision.

### 10.5 Entité `reports`

1. `id` : identifiant interne.
2. `alternative_id` : fiche signalée.
3. `reason` : information obsolète, incorrecte, trompeuse, lien dangereux ou autre.
4. `details` : précision facultative nettoyée.
5. `status` : nouveau, en revue, résolu ou écarté.
6. `created_at` : date de réception.
7. `resolved_at` : date de résolution.

### 10.6 Entité `moderation_events`

1. `id` : identifiant interne.
2. `entity_type` : type d’objet concerné.
3. `entity_id` : identifiant de l’objet.
4. `action` : action effectuée.
5. `reason` : justification.
6. `reviewer_id` : auteur.
7. `previous_status` : statut précédent.
8. `new_status` : nouveau statut.
9. `created_at` : date de l’événement.

Les événements de modération ne doivent pas être modifiés silencieusement. Une correction doit créer un nouvel événement.

## 11. États et transitions

### 11.1 Contribution

États autorisés :

1. `pending` : reçue, non traitée.
2. `in_review` : ouverte par un modérateur.
3. `needs_verification` : information complémentaire requise.
4. `approved` : version validée.
5. `rejected` : refusée avec motif.

Transitions autorisées :

1. `pending` vers `in_review`.
2. `in_review` vers `needs_verification`.
3. `in_review` vers `approved`.
4. `in_review` vers `rejected`.
5. `needs_verification` vers `in_review`.
6. `needs_verification` vers `rejected`.

Toute transition inconnue doit être refusée côté serveur.

### 11.2 Fiche publique

États autorisés :

1. `draft` : non visible.
2. `pending` : en attente de revue.
3. `approved` : visible publiquement.
4. `rejected` : non visible.
5. `unpublished` : retirée du public, historique conservé.

La lecture publique doit appliquer une condition équivalente à `moderation_status = approved` et ne doit pas dépendre d’un filtre exécuté seulement dans le navigateur.

### 11.3 Signalement

États autorisés :

1. `new`.
2. `in_review`.
3. `resolved`.
4. `dismissed`.

Une résolution doit préciser l’action réalisée ou la raison de l’absence de changement.

## 12. Exigences fonctionnelles détaillées

### 12.1 Recherche et filtres

RF 001. Le système doit rechercher dans le nom de l’alternative, le nom de l’outil remplacé, la catégorie, les fonctions couvertes, les plateformes et les cas d’usage publics.

RF 002. Le système doit ignorer les contenus non approuvés dans les résultats publics.

RF 003. Le système doit permettre de filtrer par catégorie.

RF 004. Le système doit permettre de filtrer par statut tarifaire.

RF 005. Le système doit permettre de filtrer par plateforme.

RF 006. Le système doit permettre de filtrer par mode d’installation.

RF 007. Le système doit permettre de filtrer par confiance et fraîcheur de vérification.

RF 008. Le système doit afficher les filtres actifs.

RF 009. Le système doit permettre de retirer chaque filtre séparément.

RF 010. Le système doit afficher un état vide explicite lorsque la recherche ne retourne aucun résultat.

RF 011. Le classement doit être explicable et privilégier l’approbation, la confiance, la fraîcheur puis la pertinence textuelle.

RF 012. Aucun paiement, lien affilié ou popularité non mesurée ne doit modifier automatiquement le classement.

### 12.2 Fiches

RF 013. Une fiche publique doit afficher son statut tarifaire exact.

RF 014. Une fiche publique doit afficher ses limites.

RF 015. Une fiche publique doit afficher sa date de vérification.

RF 016. Une fiche publique doit afficher son niveau de confiance.

RF 017. Une fiche publique doit afficher ses références déclarées.

RF 018. Une fiche publique doit permettre d’ouvrir une comparaison.

RF 019. Une fiche publique doit permettre un signalement.

RF 020. Une fiche dépubliée ne doit plus être accessible comme contenu public, mais son historique interne doit rester conservé.

### 12.3 Comparaison

RF 021. Le système doit accepter deux ou trois fiches approuvées.

RF 022. Le système doit afficher les mêmes dimensions pour chaque fiche.

RF 023. Le système doit distinguer une valeur absente d’une valeur négative.

RF 024. Le système ne doit pas déclarer automatiquement une solution gagnante.

RF 025. Le système doit permettre de revenir à la recherche sans perdre les critères actifs lorsque cela est techniquement possible.

### 12.4 Contribution

RF 026. Le formulaire doit différencier une alternative et une astuce.

RF 027. Le formulaire doit valider les champs obligatoires côté client et côté serveur.

RF 028. Le formulaire doit normaliser les espaces superflus sans modifier le sens du contenu.

RF 029. Le formulaire doit refuser une URL dont le schéma n’est pas autorisé.

RF 030. Le formulaire doit limiter les tailles de texte et le nombre de références.

RF 031. Le système doit détecter les doublons probables par identifiant normalisé et similarité simple.

RF 032. Le système doit enregistrer une contribution valide avec le statut `pending`.

RF 033. Le système doit afficher une confirmation sans promettre la publication.

RF 034. Le système ne doit envoyer aucune notification externe automatiquement.

### 12.5 Modération

RF 035. Le modérateur doit pouvoir filtrer la file par type et statut.

RF 036. Le modérateur doit pouvoir consulter toutes les données nécessaires à la décision sans exposer les coordonnées dans la vue publique.

RF 037. Le modérateur doit pouvoir corriger une contribution.

RF 038. Le modérateur doit pouvoir demander une vérification complémentaire.

RF 039. Le modérateur doit pouvoir approuver.

RF 040. Le modérateur doit pouvoir rejeter avec un motif.

RF 041. Le modérateur doit pouvoir dépublier avec un motif.

RF 042. Toute décision doit créer un événement de modération.

RF 043. Toute action doit être contrôlée côté serveur.

RF 044. L’approbation doit publier uniquement la version revue.

RF 045. Le système doit empêcher une transition non autorisée.

### 12.6 Signalement

RF 046. Le visiteur doit pouvoir choisir un motif prédéfini.

RF 047. Le visiteur doit pouvoir ajouter une précision facultative.

RF 048. Le système doit limiter les soumissions répétitives.

RF 049. Le signalement doit être visible dans la file interne.

RF 050. La résolution doit conserver le statut, l’auteur et la date.

## 13. Exigences non fonctionnelles

### 13.1 Sécurité

RNF 001. Aucun secret ne doit apparaître dans le dépôt, les fixtures, les logs, les commentaires ou le Kanban.

RNF 002. Les autorisations doivent être vérifiées côté serveur.

RNF 003. Les données publiques et les données de modération doivent être séparées.

RNF 004. Les coordonnées facultatives doivent être minimisées, protégées et non affichées publiquement.

RNF 005. Le contenu utilisateur doit être échappé avant affichage.

RNF 006. Les URLs doivent être validées contre les schémas dangereux.

RNF 007. Les entrées doivent être limitées en taille et en fréquence.

RNF 008. Les erreurs publiques ne doivent pas révéler de détails d’infrastructure.

RNF 009. Une opération destructive de masse doit exiger une sauvegarde et une validation explicite.

RNF 010. Les événements de modération doivent être protégés contre la modification silencieuse.

### 13.2 Vie privée

RNF 011. La consultation publique ne doit pas exiger de donnée personnelle.

RNF 012. La collecte de contact doit être facultative et justifiée.

RNF 013. La durée de conservation des contacts et signalements doit être documentée avant mise en production.

RNF 014. Aucune transcription, donnée de profil Hermes, cookie ou token ne doit être utilisée comme contenu public.

RNF 015. Les métriques doivent privilégier des données agrégées et minimisées.

### 13.3 Qualité et disponibilité

RNF 016. Les transitions métier doivent être couvertes par des tests unitaires.

RNF 017. Le parcours soumission, approbation et dépublication doit être couvert par un test d’intégration.

RNF 018. Le parcours recherche, fiche, comparaison et contribution doit être vérifié dans un navigateur réel ou automatisé.

RNF 019. La persistance doit être vérifiée après rechargement.

RNF 020. Les erreurs console non traitées doivent être absentes des parcours principaux.

RNF 021. Les états de chargement, vide, erreur et succès doivent être explicitement conçus.

### 13.4 Accessibilité et ergonomie

RNF 022. Les actions principales doivent être utilisables au clavier.

RNF 023. Les champs doivent posséder un libellé explicite et une erreur compréhensible.

RNF 024. Le statut tarifaire et les limites ne doivent pas être communiqués uniquement par la couleur.

RNF 025. Les fiches doivent rester lisibles sur écran étroit.

RNF 026. Les actions de modération à effet public doivent afficher leur conséquence avant confirmation.

## 14. Critères d’acceptation par fonctionnalité

### 14.1 Catalogue public

CA 001. Étant donné une fiche approuvée, quand le visiteur recherche son nom, alors la fiche apparaît.

CA 002. Étant donné une fiche en attente, quand le visiteur recherche son nom, alors la fiche n’apparaît pas.

CA 003. Étant donné plusieurs fiches, quand le visiteur active un filtre, alors seuls les résultats correspondant au filtre sont affichés.

CA 004. Quand le visiteur retire le filtre, alors les résultats précédemment visibles redeviennent accessibles.

### 14.2 Fiche et comparaison

CA 005. Quand le visiteur ouvre une fiche approuvée, alors le statut tarifaire, les limites, la confiance et la date de vérification sont visibles.

CA 006. Quand le visiteur sélectionne deux fiches approuvées, alors la comparaison affiche les fonctions, limites, plateformes et modes d’installation côte à côte.

CA 007. Quand une donnée n’est pas connue, alors elle apparaît comme non renseignée et non comme confirmée.

### 14.3 Contribution

CA 008. Quand un champ obligatoire est absent, alors l’envoi est refusé et le champ est signalé.

CA 009. Quand une URL utilise un schéma interdit, alors l’envoi est refusé côté serveur.

CA 010. Quand une contribution valide est envoyée, alors elle est persistée avec le statut `pending`.

CA 011. Après rechargement, la contribution reste lisible dans la file interne et n’apparaît pas dans le catalogue public.

### 14.4 Modération

CA 012. Quand le modérateur approuve une contribution valide, alors seule la version approuvée devient publique.

CA 013. Quand le modérateur rejette une contribution, alors un motif, un auteur et une date sont conservés.

CA 014. Quand le modérateur dépublie une fiche, alors elle disparaît du catalogue et l’historique reste disponible.

CA 015. Quand une transition inconnue est demandée, alors le serveur refuse l’action sans modifier l’état.

### 14.5 Signalement

CA 016. Quand un visiteur envoie un signalement valide, alors le signalement apparaît dans la file interne.

CA 017. Quand le modérateur résout un signalement, alors la résolution conserve une date et un état final.

### 14.6 Sécurité

CA 018. Une personne non autorisée ne peut pas appeler directement une action de modération avec succès.

CA 019. Un contenu utilisateur contenant un script est affiché comme texte ou refusé, jamais exécuté.

CA 020. Une URL dangereuse est refusée avant sa conservation ou son affichage.

## 15. Modération et gouvernance éditoriale

### 15.1 Principes

1. Toute donnée communautaire est une proposition, jamais une vérité automatique.
2. Toute fiche publique doit avoir une décision identifiable.
3. Toute information sensible au temps doit avoir une date de vérification.
4. Le statut tarifaire doit décrire les conditions réelles connues.
5. Une source est une référence à examiner, pas une preuve automatique.
6. Une correction ne doit pas effacer l’historique de la décision précédente.
7. Les contenus promotionnels ou trompeurs sont rejetés.

### 15.2 File de modération

La file doit permettre de voir au minimum :

1. L’ancienneté.
2. Le type de contenu.
3. L’outil concerné.
4. Le statut courant.
5. Le niveau de confiance déclaré.
6. Le nombre de références.
7. Les signalements associés.
8. Le dernier événement de modération.

### 15.3 Motifs contrôlés

Les motifs de rejet ou de demande de vérification doivent proposer des valeurs contrôlées :

1. Source absente.
2. Source inaccessible.
3. Statut tarifaire ambigu.
4. Limites manquantes.
5. Doublon probable.
6. Contenu promotionnel.
7. URL invalide ou dangereuse.
8. Information obsolète.
9. Équivalence non démontrée.
10. Contenu hors sujet.
11. Autre, avec commentaire obligatoire.

## 16. Architecture produit cible du MVP

L’architecture doit séparer quatre surfaces.

1. Surface publique : recherche, filtres, fiches approuvées, comparaison et signalement.
2. Surface de contribution : formulaire, validation et confirmation.
3. Surface de modération : file, revue, décisions et historique.
4. Couche de données : contenu, statuts, contrôle d’accès, persistance et événements.

La source de vérité doit être unique pour les statuts et les versions publiques. La visibilité ne doit pas être déterminée uniquement par une logique de présentation dans le navigateur.

Le choix précis de la stack reste à confirmer avant le développement. Le PRD ne prescrit pas de fournisseur, de base de données ou de service de déploiement sans décision explicite.

## 17. Événements produit et métriques

### 17.1 Événements minimaux

1. `search_submitted`.
2. `filter_applied`.
3. `alternative_viewed`.
4. `comparison_started`.
5. `submission_started`.
6. `submission_created`.
7. `report_created`.
8. `moderation_opened`.
9. `submission_approved`.
10. `submission_rejected`.
11. `submission_needs_verification`.
12. `alternative_unpublished`.
13. `persistence_readback_verified` pour les tests internes uniquement.

Les événements ne doivent pas contenir de secret, de contenu privé complet ou de contact non nécessaire.

### 17.2 Indicateurs de découverte

1. Taux de recherche qui aboutit à l’ouverture d’une fiche.
2. Nombre de recherches sans résultat.
3. Répartition des recherches par catégorie.
4. Taux d’utilisation des filtres.
5. Taux de démarrage d’une comparaison après consultation.

### 17.3 Indicateurs de confiance

1. Part des fiches approuvées avec une date de vérification.
2. Part des fiches dont la vérification est considérée fraîche selon le délai choisi.
3. Nombre de signalements par fiche.
4. Délai médian de traitement d’un signalement.
5. Taux de contributions nécessitant une vérification complémentaire.
6. Taux de rejet par motif.

### 17.4 Indicateurs de contribution

1. Nombre de contributions commencées.
2. Taux de formulaires valides.
3. Taux de doublons probables.
4. Délai médian entre contribution et première revue.
5. Taux d’approbation après revue.
6. Taux de rechargement réussi avec lecture de l’état persisté.

Aucun objectif chiffré ne doit être présenté comme validé avant une période d’observation réelle. Les premières valeurs servent de référence de départ.

## 18. SEO et partage public

1. Seules les fiches approuvées peuvent être indexables.
2. Les fiches en attente, rejetées ou dépubliées doivent être exclues de l’indexation publique.
3. Le titre et la description doivent refléter le contenu vérifié.
4. Les métadonnées ne doivent pas exagérer la gratuité ou l’équivalence.
5. Un contenu de démonstration doit être marqué comme démonstration et ne doit pas être présenté comme une recommandation réelle.
6. La mise en ligne publique est une décision distincte du développement local.

## 19. Tests et stratégie de vérification

### 19.1 Tests unitaires

1. Validation des valeurs de `pricing_status`.
2. Validation des valeurs de `verification_status`.
3. Validation des transitions de contribution.
4. Validation des transitions de fiche.
5. Validation des transitions de signalement.
6. Validation des URLs autorisées.
7. Normalisation des identifiants et détection de doublons.
8. Calcul du classement explicable.
9. Filtrage du contenu approuvé.

### 19.2 Tests d’intégration

1. Création d’une contribution valide.
2. Rejet d’une contribution invalide.
3. Lecture de la contribution après rechargement ou nouvelle session.
4. Approbation et exposition publique de la bonne version.
5. Rejet avec conservation du motif.
6. Dépublication avec conservation de l’historique.
7. Création et résolution d’un signalement.
8. Refus d’une action de modération non autorisée.

### 19.3 Tests navigateur

1. Recherche depuis la page d’accueil.
2. Activation et retrait de filtres.
3. Ouverture d’une fiche.
4. Comparaison de deux options.
5. Soumission avec erreurs de validation.
6. Soumission valide.
7. Rechargement et lecture de l’état persisté.
8. Approbation dans la surface de modération.
9. Vérification de la visibilité publique.
10. Signalement.
11. Vérification de la console et des requêtes échouées.

### 19.4 Vérification de sécurité

1. Recherche de secrets dans le dépôt et les fixtures.
2. Test de contenu scripté dans les champs utilisateur.
3. Test de schémas URL interdits.
4. Test d’accès direct aux actions de modération.
5. Test de limitation anti spam.
6. Vérification de l’absence de données privées dans les métriques.
7. Vérification de sauvegarde avant opération destructive.

## 20. Plan de livraison

### Étape 0 : décisions de lancement

Livrables :

1. Deux ou trois catégories initiales.
2. Politique de contribution sans compte ou avec compte léger.
3. Délai de fraîcheur d’une fiche.
4. Politique de conservation des signalements et contacts facultatifs.
5. Stack d’implémentation.
6. Environnement de test.
7. Rôle autorisé à valider une publication externe.

Critère de sortie : les décisions sont écrites dans le Kanban et aucune dépendance externe non autorisée n’est nécessaire pour commencer le développement local.

### Étape 1 : contrat de données et règles métier

Livrables :

1. Schéma des entités.
2. Énumérations de statuts.
3. Transitions valides.
4. Validateurs.
5. Fixtures de démonstration.
6. Tests unitaires des règles métier.

Critère de sortie : les tests des statuts, transitions et validations sont verts.

### Étape 2 : catalogue public

Livrables :

1. Recherche.
2. Filtres.
3. Fiches.
4. Comparaison.
5. États de chargement, vide et erreur.
6. SEO de base.

Critère de sortie : le parcours de découverte complet est vérifié sur les fixtures approuvées et exclut les autres statuts.

### Étape 3 : contribution et modération

Livrables :

1. Formulaire.
2. Validation serveur.
3. Persistance.
4. File de modération.
5. Décisions.
6. Journal d’événements.

Critère de sortie : contribution, rechargement, approbation, rejet et lecture publique sont vérifiés de bout en bout.

### Étape 4 : signalements et durcissement

Livrables :

1. Formulaire de signalement.
2. Limitation anti spam.
3. Contrôle d’accès.
4. Nettoyage du contenu.
5. Validation des URLs.
6. Tests de sécurité.
7. Vérification de la conservation et des sauvegardes.

Critère de sortie : les scénarios de sécurité et de confidentialité critiques sont validés.

### Étape 5 : préparation d’une publication éventuelle

Livrables :

1. Revue éditoriale.
2. Revue de confidentialité.
3. Vérification navigateur sur l’environnement ciblé.
4. Vérification des métadonnées publiques.
5. Vérification des fixtures et de leur marquage.
6. Décision séparée de publication externe.

Critère de sortie : aucune mise en ligne ou publication externe n’est déclarée avant validation explicite d’Okba.

## 21. Risques et mesures de réduction

### Risque 1 : fiches obsolètes

Mesures : date de vérification obligatoire, indicateur de fraîcheur, signalement et statut `stale`.

### Risque 2 : confusion autour du mot gratuit

Mesures : statuts tarifaires contrôlés, limites visibles, rédaction sans promesse d’équivalence.

### Risque 3 : contenu promotionnel ou affilié

Mesures : déclaration des liens, modération, classement sans avantage commercial automatique.

### Risque 4 : spam et doublons

Mesures : limitation de fréquence, validation, détection de doublons et revue humaine.

### Risque 5 : publication involontaire d’un contenu en attente

Mesures : filtrage côté serveur, tests d’accès direct et séparation des statuts.

### Risque 6 : perte ou écrasement de données

Mesures : persistance testée, export ou sauvegarde avant action destructive, migration versionnée.

### Risque 7 : exposition de données personnelles

Mesures : contact facultatif, séparation des champs, minimisation, contrôle d’accès et durée de conservation documentée.

### Risque 8 : automatisation externe non maîtrisée

Mesures : aucune collecte ou publication automatique dans le MVP, validation séparée et arrêt sur refus d’accès.

### Risque 9 : dépendance à une décision non prise

Mesures : bloquer l’étape concernée, documenter la décision requise et poursuivre uniquement les travaux indépendants en local.

## 22. Décisions requises avant développement

1. Quelles sont les deux ou trois premières catégories ?
2. La contribution est elle ouverte sans compte ?
3. Quel délai déclenche le statut à revérifier ?
4. Combien de temps conserver un contact facultatif ?
5. Combien de temps conserver un signalement résolu ?
6. Quelle stack sera utilisée ?
7. Quel environnement recevra le premier déploiement de test ?
8. Qui peut approuver une publication externe ?
9. Le contenu de démonstration doit il rester visible sur l’environnement de test ?
10. Quelles limites doivent être considérées comme bloquantes pour une fiche publique ?

## 23. Définition de terminé du MVP

Le MVP est terminé uniquement si toutes les conditions suivantes sont remplies.

1. Le contrat de données est implémenté ou matérialisé dans un artefact versionné.
2. Les statuts et transitions sont couverts par des tests.
3. Le catalogue public ne montre que les fiches approuvées.
4. La recherche, les filtres, la fiche et la comparaison fonctionnent.
5. Une contribution valide est persistée en attente.
6. Une contribution invalide est refusée avec une explication.
7. Le rechargement restitue l’état persistant.
8. L’approbation, le rejet, la demande de vérification et la dépublication sont traçables.
9. Un signalement peut être créé et résolu.
10. Les contrôles d’accès critiques sont testés.
11. Le contenu utilisateur est nettoyé et les URLs sont contrôlées.
12. Les données privées ne sont pas exposées dans l’interface publique.
13. Les parcours principaux sont vérifiés dans un navigateur.
14. La console ne présente pas d’erreur non traitée sur ces parcours.
15. Le document de politique de conservation est disponible.
16. Les fixtures de démonstration sont identifiées.
17. Aucune publication externe n’a été effectuée sans validation explicite.
18. Le résultat vérifié est enregistré dans Hermes Kanban.

## 24. Conclusion

La première version doit privilégier la confiance, la lisibilité et la traçabilité plutôt que le volume ou l’automatisation. Le chemin recommandé est une tranche verticale complète : contrat de données, recherche, fiche, comparaison, contribution en attente, modération et signalement.

Les données externes, les importations automatiques, les recommandations génératives et les publications sortantes restent séparées du cœur du MVP. Elles ne pourront être envisagées qu’après vérification de la valeur, de la conformité, de la sécurité et de la capacité de validation humaine.
