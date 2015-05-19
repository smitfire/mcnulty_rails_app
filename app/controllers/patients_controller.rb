class PatientsController < ApplicationController
  def show
    @patient = Patient.find(params[:id])
    if request.xhr?
      build_pie_chart(@patient.id)
    else
      render 'show'
    end
  end

  def create
  end

  def donut
    @patient = Patient.find(params[:id])
    if request.xhr?
      render csv: @patient, only: [:chol, :thalach, :trestbps, :ekgyr, :tpeakbps]
    end
  end

  def new
    # render 'graph'
  end
end
