class WelcomeController < ApplicationController
  def index
    @patient = Patient.first
  end
end
