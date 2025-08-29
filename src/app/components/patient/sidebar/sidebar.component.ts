import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements AfterViewInit {

  @ViewChild('sidebar') sidebarRef!: ElementRef;

  ngAfterViewInit(): void {
    const sidebar = this.sidebarRef.nativeElement;
    const toggle = sidebar.querySelector(".toggle") as HTMLElement;
    const searchBtn = sidebar.querySelector(".search-box") as HTMLElement;
    const modeSwitch = sidebar.querySelector(".toggle-switch") as HTMLElement;
    const modeText = sidebar.querySelector(".mode-text") as HTMLElement;

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
      sidebar.classList.remove("close");
    });

    modeSwitch.addEventListener("click", () => {
      document.body.classList.toggle("dark"); // applique le dark sur body
      modeText.innerText = document.body.classList.contains("dark") ? "Light mode" : "Dark mode";
    });
  }
}
