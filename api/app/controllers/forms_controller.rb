require 'json'
class FormsController < ApplicationController
  
  def index
    forms = Form.where(is_child: false).order('created_at DESC')
    render json: forms, status: :ok
  end

  def show
    id = params[:id]
    form = Form.find(id)
    render json: {
      :name => form.name,
      :full_object => full_form_object(id), 
      :json_data => form.json_data
    }, status: :ok
  end

  def full_form_object(id)
    
    keys = Key.where(form_id: id)

    final_object = [];

    for k in keys do
      v = Value.where(key_id: k.id).first()
      child_form = nil

      if v.data_type == 'child'
        child_form = full_form_object(v.form_id)
      end

      obj = {
        :key => {
          :id => k.id,
          :type => k.data_type,
          :default => k.default_val,
          :mutable => k.mutable,
          :form_id => k.form_id
        },
        :value => {
          :id => v.id,
          :type => v.data_type,
          :default => v.default_val,
          :mutable => v.mutable,
          :key_id => v.key_id,
          :child_form => v.form_id
        },
        :children => child_form
      }

      final_object.push(obj)
    end
    return final_object
  end

  def create
    data = new_form_params[:data]

    form = create_form(data, data.as_json.to_json, new_form_params[:name])
    render json: form, status: :ok
  end

  def create_form(data, json, name, idx=0)
    title = name + (idx>0 ? "_child_#{idx}" : '')
    form = Form.create({:json_data => json, :name => title, :is_child => (idx > 0)})

    for kvp in data do
      key = kvp[:key]
      value = kvp[:value]

      newKey = Key.create({
        :data_type => key[:type],
        :default_val => key[:default],
        :mutable => key[:mutable],
        :form_id => form[:id]
      })

      if value[:type] == 'child'
        newForm = create_form(kvp[:children], '', name, idx+1)
        newValue = Value.create({
          :data_type => value[:type],
          :key_id => newKey.id,
          :form_id => newForm.id
        })
      else
        newValue = Value.create({
          :data_type => value[:type],
          :default_val => value[:default],
          :mutable => value[:mutable],
          :key_id => newKey.id
        })
      end
    end
    return form
  end

  private
  def new_form_params
    params
    # .permit(:name, data: [
    #   key: [
    #     :type, :mutable, :multiple, :default
    #   ],
    #   value: [
    #     :type, :mutable, :multiple, :default
    #   ],
    #   children: []
    # ]);
  end

end

