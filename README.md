# projet_groupe_WF3

Bienvenue sur le projet réalisé à la fin de ma formation en groupe avec 2 autres élèves.
Il s'agit d'un projet de site ecommerce de vente de plantes.
Il utilise Angular pour la partie Front et Symfony pour la partie Back.
Mon rôle dans ce projet a été de m'occuper de la partie "utilisateur" (création de compte, connection sécurisée avec token JWT, mise à jour et suppression de compte, création de la page "mon compte", ajouts en base de données, api)
Je me suis également occupée de la partie connection de l'administrateur.

Ce projet étant sur le github d'un de mes collègues en mode 'privé', je me suis permise de le re-uploader sur mon compte pour qu'il puisse être vu dans le cadre de ma recherche de stage ou d'alternance. Malheureusement il n'est donc pas possible de voir le découpage du travail en groupe ainsi que les commits etc

Pour plus d'information, j'ai joint la présentation en pdf faite à la fin de ma formation.

Pour installer et tester ce projet :

- il faut avoir openssl d'installé et procéder à la génération des ssl keys :

        $ mkdir -p config/jwt
        $ openssl genpkey -out config/jwt/private.pem -aes256 -algorithm rsa -pkeyopt rsa_keygen_bits:4096
        $ openssl pkey -in config/jwt/private.pem -out config/jwt/public.pem -pubout

        (cf https://github.com/lexik/LexikJWTAuthenticationBundle/blob/master/Resources/doc/index.md#prerequisites)

- Il faut ajouter ces lignes dans le .env du back à propos de nelnio
  ###> nelmio/cors-bundle ###
  CORS_ALLOW_ORIGIN='^http?://(localhost|127\.0\.0\.1)(:[0-9]+)?$'
        # CORS_ALLOW_ORIGIN='^https?://(localhost|127.0.0.1)(:[0-9]+)?$'
  ###< nelmio/cors-bundle ###

- Il faut faire npm install (Front) / composer install (Back)

- Il faut utiliser les commandes symfony pour générer la base de données ainsi que les fixtures sur votre machine

- Il faut ajouter les infos concernant la connexion à la base de données dans le .env
