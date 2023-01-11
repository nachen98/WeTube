def doesnot_exist_error(element):
    return {
        "message": f'{element} couldn\'t be found',
        "statusCode": 404
    }, 404