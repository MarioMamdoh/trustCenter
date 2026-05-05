import { Component, inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BlogService } from '../../services/blogs.service';
export interface PeriodicElement {
  id: string;
  title: string;
  position: number;
  summary: string;
  image: string;
}

@Component({
  selector: 'app-blogs',
  imports: [RouterLink, MatTableModule],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent {
  toastr = inject(ToastrService);
  blogService = inject(BlogService);
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['position', 'title', 'summary', 'edit'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
  ngOnInit() {
    this.loadBlogs();
  }
  loadBlogs() {
    this.blogService.getAll().subscribe({
      next: (blogs) => {
        this.ELEMENT_DATA = [];
        let serviceIndex = 1;
        blogs.forEach((blog: any) => {
          this.ELEMENT_DATA.push({
            position: serviceIndex++,
            title: blog['title'],
            summary: blog['summary'],
            id: blog['_id'], // Include the blog ID
            image: blog['image'],
          });
        });
        this.dataSource.data = this.ELEMENT_DATA; // Update the dataSource
      },
      error: (error) => {
        console.error('Error loading services:', error);
      },
    });
  }
  async deleteBlog(element: any) {
    const blogId = element.id;

    this.blogService.delete(blogId).subscribe({
      next: (data) => {
        const fileId = element.image
          .slice(
            element.image.indexOf('/files/'),
            element.image.indexOf('/view?')
          )
          .split('/')[2];
        this.toastr.success('Service deleted successfully', 'Success!');
        this.loadBlogs();
        return this.blogService.deleteImage(fileId).subscribe((data) => {});
      },
    });
  }
  onEdit() {
    return (this.blogService.editMode = true);
  }
  onAdding() {
    return (this.blogService.editMode = false);
  }
  getElementById(element: any) {
    const blogId = element.id;
    return blogId;
  }
}
