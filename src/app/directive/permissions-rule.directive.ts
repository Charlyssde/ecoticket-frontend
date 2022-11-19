import {Directive, Input, OnInit, Renderer2, TemplateRef, ViewContainerRef} from '@angular/core';
import {PermissionService} from "../services/permission.service";

@Directive({
  selector: '[permissionsRuleDirective]'
})
export class PermissionsRuleDirective implements OnInit{

  private currentPermision : any;
  private permissions : string[] = [];

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private permissionService: PermissionService
  ) { }

  ngOnInit(): void {
    this.permissionService.event$.subscribe((_) => {})
    }

  @Input()
  set permissionsRuleDirective(userPermission : string[]) {
    let user_info = sessionStorage.getItem('info-user');
    if(user_info !== null){
      this.currentPermision = JSON.parse(user_info);
      this.permissions = userPermission;
      this.updateView();
    }
  }

  private updateView() {
    const result = this.checkPermission();
    console.log("Result->", result)
    if (result) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  private checkPermission() {
    let hasPermission = false;
    console.log("Permissions->", this.currentPermision);
    console.log("PermissionsUser->", this.permissions);
    if (this.currentPermision && this.currentPermision.permissions) {
      for (const checkPermission of this.permissions) {
        console.log("Start again")
        const permissionFound = this.currentPermision.permissions.find((x : string) => x.toUpperCase() === checkPermission.toUpperCase());
        console.log("P_found->", permissionFound)
        if (permissionFound) {
          hasPermission = true
        }
      }
    }
    console.log("HasPermission->", hasPermission)
    return hasPermission;
  }

}
