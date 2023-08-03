const mockEvent = [
    {
        "name": "Big Bird's Talk Show",
        "start_time": "2023-08-20T10:00:00.000Z",
        "end_time": "2023-08-20T16:00:00.000Z",
        "street_num": 1234,
        "street": "Sesame St",
        "postal_code": "K8V2V3",
        "city": "Trenton",
        "province": "ON",
        "tier_description": "Standard Seating"
    }
]

const empty = [];

const mockShift = [
    {
        "name": "Big Bird's Talk Show",
        "role": "Line Cook",
        "start_time": "2023-08-20T10:00:00.000Z",
        "end_time": "2023-08-20T16:00:00.000Z",
        "station": "Concession",
        "street_num": 1234,
        "street": "Sesame St",
        "postal_code": "K8V2V3",
        "city": "Trenton",
        "province": "ON",
    }
]

const mockDependants = [
    {
        "first_name": "John",
        "last_name": "Tolkien",
        "customer_id": 1,
        "birthdate": "2012-08-07T00:00:00.000Z"
    },
    {
        "first_name": "Jane",
        "last_name": "Austen",
        "customer_id": 2,
        "birthdate": "2013-09-04T00:00:00.000Z"
    }
]

export {
    mockEvent,
    empty,
    mockShift,
    mockDependants
}