import {Component} from '@angular/core';
import {PostListComponent} from '../../shared/components/post-list/post-list.component';
import {ButtonComponent} from '../../shared/components/button/button.component';
import {IPost} from '../../interfaces/post.interface';

@Component({
  selector: 'app-posts',
  imports: [
    PostListComponent,
    ButtonComponent
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent {
  posts: IPost[] = [
    {
      "id": "1",
      "title": "Introduction à JavaScript",
      "author": "florian",
      "content": "JavaScript est un langage de programmation essentiel pour le développement web. Il permet d'ajouter de l'interactivité aux pages, de manipuler dynamiquement le contenu HTML et de gérer les événements utilisateurs. Ce langage est utilisé côté client et de plus en plus côté serveur grâce à Node.js.",
      "created_at": "01/07/2025"
    },
    {
      "id": "2",
      "title": "Comprendre les APIs REST",
      "author": "florian",
      "content": "Les APIs REST sont une norme pour échanger des données entre un client et un serveur. Elles utilisent des méthodes HTTP simples comme GET pour lire, POST pour créer, PUT pour mettre à jour et DELETE pour supprimer des ressources. Cet article explore leur fonctionnement et leur conception.",
      "created_at": "02/07/2025"
    },
    {
      "id": "3",
      "title": "Les bases de React",
      "author": "florian",
      "content": "React est une bibliothèque JavaScript populaire pour construire des interfaces utilisateurs. Elle repose sur des composants réutilisables, gère un état interne (state) et facilite la création d'applications web réactives et performantes. Ce tutoriel vous guide à travers ses principes fondamentaux.",
      "created_at": "03/07/2025"
    },
    {
      "id": "4",
      "title": "Introduction à Node.js",
      "author": "florian",
      "content": "Node.js est un environnement d'exécution JavaScript orienté serveur. Il permet de créer des applications back-end rapides et évolutives, grâce à son architecture non bloquante. Ce guide couvre l'installation, les modules principaux et les cas d'usage courants comme la création d'une API.",
      "created_at": "04/07/2025"
    },
    {
      "id": "5",
      "title": "Découverte de MongoDB",
      "author": "florian",
      "content": "MongoDB est une base de données NoSQL orientée documents, idéale pour gérer des données flexibles et évolutives. Elle stocke les données au format BSON (similaire à JSON) et permet des requêtes puissantes. Ce tutoriel aborde les opérations CRUD et la modélisation de données dans MongoDB.",
      "created_at": "05/07/2025"
    }

  ];
}
