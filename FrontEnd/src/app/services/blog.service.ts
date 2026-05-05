import { inject, Injectable } from '@angular/core';
import { Blog } from '../models/blog.model';
import { AppService } from '../../../services/appService.service';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  appService = inject(AppService);
  private blogsData!: Blog[];
  constructor() {
    this.appService.getAllBlogs().subscribe((val) => {
      this.blogsData = val.map((blog: any) => ({
        id: blog.id,
        title: blog.title,
        description: blog.description,
        imageUrl: blog.image,
        content: blog.content,
        views: blog.views,
        date: new Date(blog.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
      }));
    });
    this.blogs = [...this.blogsData];
  }
  private blogs: Blog[] = [
    {
      id: 1,
      title: 'Getting Started with Angular',
      description: 'Learn the basics of Angular and build your first app.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 10,
      date: 'Sep 20, 2024',
    },
    {
      id: 2,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 3,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 4,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 5,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 6,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 7,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 8,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
    {
      id: 9,
      title: 'Advanced Angular Techniques',
      description: 'Explore advanced features like RxJS and NgRx.',
      imageUrl: 'assets/Geriatric-Nursing-Certification-1.jpg',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      views: 5,
      date: 'Sep 21, 2024',
    },
  ];

  getBlogs(): Blog[] {
    return this.blogs;
  }

  getBlogById(id: number): Blog | undefined {
    return this.blogs.find((blog) => blog.id === id);
  }
}
