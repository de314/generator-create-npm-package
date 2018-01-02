import 'babel-polyfill'
import { expect } from 'chai'

describe('Example Tests', function() {
  it('should succeed because life is too easy!', function() {
    expect(1).to.equal(1)
  })
  it('should succeed async', function(done) {
    setTimeout(() => {
      expect(1).to.equal(1)
      done()
    }, 500)
  })
  it('should fail because you haven\'t written tests yet', function() {
    expect(true).to.equal(false)
  })
})
