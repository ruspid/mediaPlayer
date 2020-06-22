import { Component, OnInit } from '@angular/core';
import { RulesService } from '../rules.service';
import { Rule } from '../rule';

@Component({
  selector: 'pm-rule-list',
  templateUrl: './rule-list.component.html',
  styleUrls: ['./rule-list.component.css']
})
export class RuleListComponent implements OnInit {

  rules: Rule[]
  constructor(private ruleService: RulesService) { }

  ngOnInit(): void {
      this.ruleService.getRules().subscribe({
        next: rules => this.rules = rules 
      })
  }

}
