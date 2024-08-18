json.data do
  json.array! @bills do |bill|
    json.id bill.id
    json.type bill.bill_type
    json.amount bill.amount
    json.created_at bill.created_at
    json.submitted_by bill.submitted_by
    json.department bill.submitted_by.department
    json.status bill.status
  end
end
json.meta do
  json.total_approved @total_approved
  json.total_submitted @total_submitted
end