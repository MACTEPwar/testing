import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild('dd') dd;

  title = "testing1233212321";

  ngOnInit(): void {
    console.log(this.dd);
  }
}
