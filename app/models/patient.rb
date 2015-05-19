class Patient < ActiveRecord::Base
  belongs_to :doctor
  has_secure_password

  def self.num_cols_str
    columns.map{ |col| col.name if col.sql_type == "integer" && col.null && col && col.name != "id"}.compact.join(",")
  end

  def self.num_data
    pluck(num_cols_str)
  end

  def build_json
    my_arr = []
    Patient.all.each do |cat|
      my_arr << {
        'State' => cat.key,
        'freq' => {
          'accuser_posts' => cat.accuser_posts.count, 'accused_posts'=> cat.accused_posts.count ,'total_posts'=> cat.total_posts
        }
      }
    end
    my_arr
  end

  def self.donut_csv
    where("age < ?", 5)
  end

  def self.age_group
    # select("age as age, sum(chol) as total_chol").group("age")
    pluck(self.column_names)
  end

  def missing_tests_count
    
  end
end
