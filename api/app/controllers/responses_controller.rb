class ResponsesController < ApplicationController
  def index
    return_arr = []
    Response.all.each do |r|
      resp = {:id => r.id, :answers => []}
      AnswerResponse.where(response_id: r.id).find_each do |ar|
        answer = Answer.find(ar.answer_id)
        resp[:answers].push(answer)
      end
      return_arr.push(resp)
    end

    render json: return_arr, status: :ok
  end

  def get_by_form_id
    id = params[:id]
    return_arr = []
    Response.where(form_id: id) do |r|
      resp = {:id => r.id, :answers => []}
      AnswerResponse.where(response_id: r.id).find_each do |ar|
        answer = Answer.find(ar.answer_id)
        resp[:answers].push(answer)
      end
      return_arr.push(resp)
    end

    render json: return_arr, status: :ok
  end

  def show
    id = params[:id]
    render json: get_full_res(id), status: :ok
  end

  def create
    new_res = Response.create
    answers = params[:data][:answers]

    for a in answers do
      new_ans = Answer.create(a)
      new_ar = AnswerResponse.create({
        :response_id => new_res.id, 
        :answer_id => new_ans.id})
    end
    render json: get_full_res(new_res.id), status: :ok
  end

  def get_full_res(id)
    r = Response.find(id)
    resp = {:id => r.id, :answers => []}
    AnswerResponse.where(response_id: r.id).find_each do |ar|
      answer = Answer.find(ar.answer_id)
      resp[:answers].push(answer)
    end
    return resp
  end
end
