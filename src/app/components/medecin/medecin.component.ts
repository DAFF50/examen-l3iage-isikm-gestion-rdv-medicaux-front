import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medecin',
  templateUrl: './medecin.component.html',
  styleUrls: ['./medecin.component.css']
})
export class MedecinComponent implements OnInit {

  ngOnInit(): void {
    const body = document.querySelector('body') as HTMLElement;
    const sidebar = body.querySelector('nav') as HTMLElement;
    const toggle = body.querySelector(".toggle") as HTMLElement;
    const searchBtn = body.querySelector(".search-box") as HTMLElement;
    const modeSwitch = body.querySelector(".toggle-switch") as HTMLElement;
    const modeText = body.querySelector(".mode-text") as HTMLElement;

    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("close");
    });

    searchBtn.addEventListener("click", () => {
      sidebar.classList.remove("close");
    });

    modeSwitch.addEventListener("click", () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
    });
  }

}
