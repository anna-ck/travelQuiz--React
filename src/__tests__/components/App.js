import React from 'react';
import { render, screen, cleanup, fireEvent} from '@testing-library/react';
import App from '../../components/App'
import {shuffledQuestions} from '../../utilities/questions'

describe('App', () => {
    afterEach(cleanup)
    jest.setTimeout(30000);
    test('should have start quiz button', () => {
        render(<App />);
        expect( () => {screen.getByText(/Start quiz/)}).not.toThrow()
      })
      test('should start a quiz when clicking on the start button', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        expect( () => {screen.getByText('1/12')}).not.toThrow()
      })
      test('should return to home page when clicking on the logo', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Quiz Heroes/))
        expect( () => {screen.getByText(/Start quiz/)}).not.toThrow()
      })
      test('should return to home page when clicking on the logo when the quiz is running', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        fireEvent.click(screen.getByText(/Quiz Heroes/))
        expect( () => {screen.getByText(/Start quiz/)}).not.toThrow()
      })
      test('should render result page when there are no questions left', () => {
        shuffledQuestions.length = 2
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 2])
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1])
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 2])
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1])
        expect( () => {screen.getByText(/Try again/)}).not.toThrow()
      })
      test('should render result page when there are no questions left with 10 points score when the answer was correct', () => {
        shuffledQuestions.length = 1
        shuffledQuestions[0].correct = 'd'
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 2])
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1])
        expect( () => {screen.getByText("Your final result is 10/10")}).not.toThrow()
      })
      test('should render result page when there are no questions left with 0 points score when the answer was not correct', () => {
        shuffledQuestions.length = 1
        shuffledQuestions[0].correct = 'd'
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 3])
        fireEvent.click(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1])
        expect( () => {screen.getByText("Your final result is 0/10")}).not.toThrow()
      })
      test('should render with answer buttons being not disabled', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        expect(screen.getAllByRole('button')[screen.getAllByRole('button').length - 2]).not.toBeDisabled()
        expect(screen.getAllByRole('button')[screen.getAllByRole('button').length - 3]).not.toBeDisabled()
        expect(screen.getAllByRole('button')[screen.getAllByRole('button').length - 4]).not.toBeDisabled()
      })
      test('should render with next button being disabled', () => {
        render(<App />);
        fireEvent.click(screen.getByText(/Start quiz/))
        expect(screen.getAllByRole('button')[screen.getAllByRole('button').length - 1]).toBeDisabled()
      })
  });



 
