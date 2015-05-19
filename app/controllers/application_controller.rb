class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # layout 'flatly'
  # layout 'cosmo'
  # layout 'admin'
  # layout 'cyborg'
  # layout 'spacelab'

  def current_patient
    @current_patient ||= Patient.find(session[:patient_id]) if session[:patient_id]
  end
  helper_method :current_patient

  def build_pie_chart(patient_id)
    patient= Patient.find(patient_id)
    render json: { pieChart: [
        { color:"red", description: "Cholesterol, from the Ancient Greek chole- (bile) and stereos (solid) followed by the chemical suffix -ol for an alcohol, is an organic molecule. It is a sterol (or modified steroid),[4] a lipid molecule and is biosynthesized by all animal cells because it is an essential structural component of all animal (not plant or bacterial) cell membranes that is required to maintain both membrane structural integrity and fluidity.", title: "Cholestoral", value: patient.chol},
        { color: "blue", description: "Heart rate, or heart pulse, is the speed of the heartbeat measured by the number of poundings of the heart per unit of time — typically beats per minute (bpm). The heart rate can vary according to the body's physical needs, including the need to absorb oxygen and excrete carbon dioxide. Activities that can provoke change include physical exercise, sleep, anxiety, stress, illness, ingesting, and drugs.", title: "Average Cholestoral", value: Patient.average(:chol).to_int } ],
                donutChart: [
                  {},
                  {}]
                }
  end
  helper_method :build_pie_chart
end
