import { Component } from '@angular/core';

@Component({
  selector: 'app-allvendorshow',
  templateUrl: './allvendorshow.component.html',
  styleUrls: ['./allvendorshow.component.scss']
})
export class AllvendorshowComponent {
  status = [
    { title: 'Evaluating', count: 369, color: '#57ED3E' , route: 'replied'},
  ];

  inboxitem = [
    { title: "Venues", count: 369, color: "rgba(243, 53, 53, 0.12)" },
    { title: "Photography and video", count: 23, color: "rgba(243, 53, 53, 0.24)", route: "replied" },
    { title: "Caterers", count: 12, color: "rgba(243, 53, 53, 0.36)", route: "replied" },
    { title: "Wedding planners", count: 22, color: "rgba(243, 53, 53, 0.48)", route: "replied" },
    { title: "Jewellery", count: 91, color: "rgba(243, 53, 53, 0.6)", route: "replied" },
    { title: "Transportation", count: 81, color: "rgba(243, 53, 53, 0.72)", route: "replied" },
    { title: "Wedding cards", count: 76, color: "rgba(243, 53, 53, 0.84)", route: "replied" },
    { title: "Flowers and Decoration", count: 10, color: "rgba(243, 53, 53, 1)", route: "replied" },
    { title: "Bridal Accessories", count: 369, color: "rgba(243, 53, 53, 0.12)" },
    { title: "Groom's Accessories", count: 23, color: "rgba(243, 53, 53, 0.24)", route: "replied" },
    { title: "Health and Beauty", count: 12, color: "rgba(243, 53, 53, 0.36)", route: "replied" },
    { title: "Entertainment", count: 22, color: "rgba(243, 53, 53, 0.48)", route: "replied" },
    { title: "Wedding gifts", count: 91, color: "rgba(243, 53, 53, 0.6)", route: "replied" },
    { title: "Honeymoon", count: 81, color: "rgba(243, 53, 53, 0.72)", route: "replied" },
    { title: "Ceremony", count: 76, color: "rgba(243, 53, 53, 0.84)", route: "replied" },
    { title: "Mehendi Artist", count: 10, color: "rgba(243, 53, 53, 1)", route: "replied" },
    { title: "Wedding Choreographers", count: 369, color: "rgba(243, 53, 53, 0.12)" },
    { title: "Cakes", count: 23, color: "rgba(243, 53, 53, 0.24)", route: "replied" },
    { title: "Other", count: 12, color: "rgba(243, 53, 53, 0.36)", route: "replied" },
];

  category = [
    { title: 'Essential', count: 39, color: '#57ED3E' },
    { title: 'Events', count: 29, color: '#F3B640', route: 'replied' },
    { title: 'Catering', count: 12, color: '#F3B640', route: 'replied' },
    { title: 'Photography and video', count: 92, color: '#F3B640', route: 'replied' },
    { title: 'Planning', count: 19, color: '#F3B640', route: 'replied' },
  
  ];
}
