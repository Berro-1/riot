import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-riot-forge',
  templateUrl: './riot-forge.component.html',
  styleUrls: ['./riot-forge.component.css']
})
export class RiotForgeComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  initCarousel(): void {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const firstImg = carousel.querySelectorAll('img')[0];
    const arrowIcons = document.querySelectorAll('.wrapper i');

    let isDragStart = false,
      isDragging = false,
      prevPageX: number,
      prevScrollLeft: number,
      positionDiff: number;

    const showHideIcons = () => {
      let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
      (arrowIcons[0] as HTMLElement).style.display = carousel.scrollLeft === 0 ? 'none' : 'block';
      (arrowIcons[1] as HTMLElement).style.display = carousel.scrollLeft === scrollWidth ? 'none' : 'block';
    };

    arrowIcons.forEach(icon => {
      icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 14;
        carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60);
      });
    });

    const autoSlide = (): void => {
      if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

      positionDiff = Math.abs(positionDiff);
      let firstImgWidth = firstImg.clientWidth + 14;
      let valDifference = firstImgWidth - positionDiff;

      if (carousel.scrollLeft > prevScrollLeft) {
        carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
      } else {
        carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
      }
    };

    const dragStart = (e: MouseEvent | TouchEvent): void => {
      isDragStart = true;
      prevPageX = (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX;
      prevScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e: MouseEvent | TouchEvent): void => {
      if (!isDragStart) return;
      e.preventDefault();
      isDragging = true;
      carousel.classList.add('dragging');
      positionDiff = ((e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX) - prevPageX;
      carousel.scrollLeft = prevScrollLeft - positionDiff;
      showHideIcons();
    };

    const dragStop = (): void => {
      isDragStart = false;
      carousel.classList.remove('dragging');
      if (!isDragging) return;
      isDragging = false;
      autoSlide();
    };

    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('touchstart', dragStart);
    document.addEventListener('mousemove', dragging);
    carousel.addEventListener('touchmove', dragging);
    document.addEventListener('mouseup', dragStop);
    carousel.addEventListener('touchend', dragStop);
  }
}
