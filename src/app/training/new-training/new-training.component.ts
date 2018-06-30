import { Component, OnInit } from '@angular/core';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../../services/training.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exercises = this.trainingService.getTrainingExercises();
  }
  onStartTranning(form: NgForm) {
    console.log(form.value.exercise);
    this.trainingService.startExercise(form.value.exercise);
  }
}
