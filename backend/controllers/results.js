async function getresults(req, res)
{
    return await results.findAll();
}

function getresult (req, res) 
{
    try 
    {

        if(results.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        res.json(results.findOne({ where: {id: req.body.id }}));
         
    } 
    catch (error) 
    {
        res.status(406)
    }
}

async function postresult (req, res) 
{
    try 
    {
        if(!isValidEmailForm(req.body.email)) throw new Error('Error');
        if(emailExist(req.body.email)) throw new Error('Error');
        const newresult = {            
            result: req.body.result,
            id_question: req.body.id_question,
            id_user_qcm: req.body.id_user_qcm
        }
        const jane = await result.create(newresult);
        res.status(201).json(newresult)
    } catch (error) {
        res.status(406)
    }
    
}

async function updateresult (req, res) 
{

    try 
    {
        
        if(results.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await result.update(
            { 
                id: req.body.id,
                result: req.body.result,
                id_question: req.body.id_question,
                id_user_qcm: req.body.id_user_qcm 
            }, 
            {
                where: 
                {
                    id: req.body.id
                }
            }
        );

        res.status(200).json('result updated')
    } catch (error) {
        res.status(406)
    }
    
}

async function deleteresult (req, res) 
{
    try 
    {

        if(results.findOne({ where: {id: req.body.id }}) == null) throw new Error('Error');

        await result.destroy({
            where: {
              id: req.body.id
            }
          });

        res.status(200).json('result deleted')
    } catch (error) {
        res.status(406)
    }
    
}

module.exports = {
    getresults,
    postresult,
    getresult,
    updateresult,
    deleteresult
}